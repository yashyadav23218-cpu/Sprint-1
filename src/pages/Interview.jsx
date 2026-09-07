import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ROLES_DATA, DIFFICULTY_CONFIG } from "../data/questionsData";

function Interview() {
  const navigate = useNavigate();

  // Load configuration from localStorage
  const savedRoleKey = localStorage.getItem("selectedRole") || "mern";
  const savedDifficultyKey = localStorage.getItem("selectedDifficulty") || "medium";
  const savedCount = parseInt(localStorage.getItem("selectedQuestionCount") || "5", 10);

  const roleConfig = ROLES_DATA[savedRoleKey] || ROLES_DATA.mern;
  const diffConfig = DIFFICULTY_CONFIG[savedDifficultyKey] || DIFFICULTY_CONFIG.medium;
  const maxTime = diffConfig.timePerQuestion || 60;

  // Build question list for this session
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [answersList, setAnswersList] = useState([]);
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState("");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(true);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize questions
  useEffect(() => {
    let pool = [];
    if (roleConfig.questions[savedDifficultyKey]) {
      pool = [...roleConfig.questions[savedDifficultyKey]];
    } else {
      // Fallback: merge all available difficulties
      pool = Object.values(roleConfig.questions).flat();
    }

    // If pool is smaller than requested count, fill from other difficulties
    if (pool.length < savedCount) {
      const allQuestions = Object.values(roleConfig.questions).flat();
      pool = Array.from(new Set([...pool, ...allQuestions]));
    }

    // Limit to chosen question count
    const sessionQuestions = pool.slice(0, savedCount);
    setQuestions(sessionQuestions);
  }, [savedRoleKey, savedDifficultyKey, savedCount]);

  // Web Speech API Initialization
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      if (finalTranscript) {
        setUserAnswer((prev) => (prev ? prev.trim() + " " + finalTranscript.trim() : finalTranscript.trim()));
      }
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "not-allowed") {
        setSpeechError("Microphone access was denied. You can continue by typing your answer.");
      } else {
        setSpeechError(`Voice input notice: ${event.error}. You can type directly.`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (!sessionStarted || questions.length === 0) return;

    setTimeLeft(maxTime);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, questions, maxTime, sessionStarted]);

  // Toggle Voice Recognition
  const toggleVoice = () => {
    if (!speechSupported) {
      alert("Speech recognition is not supported in this browser. Please type your answer.");
      return;
    }

    setSpeechError("");
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (err) {
        console.error(err);
      }
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    }
  };

  // Evaluate single answer
  const evaluateAnswer = (questionObj, text) => {
    if (!text || text.trim().length === 0) {
      return {
        score: 1,
        strengths: ["Attempted response"],
        improvements: ["No answer or elaboration provided. Try to explain the main concepts in detail."],
        wordCount: 0,
        matchedKeywords: []
      };
    }

    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    const lowerText = text.toLowerCase();

    // Keyword matching
    const keywords = questionObj.keywords || [];
    const matched = keywords.filter((k) => lowerText.includes(k.toLowerCase()));
    const matchRatio = keywords.length > 0 ? matched.length / keywords.length : 0.5;

    let score = 2; // base score for attempting
    if (wordCount >= 35) score += 3;
    else if (wordCount >= 18) score += 2;
    else if (wordCount >= 8) score += 1;

    if (matchRatio >= 0.6) score += 5;
    else if (matchRatio >= 0.3) score += 3;
    else if (matchRatio > 0) score += 2;

    score = Math.min(10, Math.max(1, score));

    const strengths = [];
    const improvements = [];

    if (matched.length > 0) {
      strengths.push(`Covered key terms: ${matched.slice(0, 3).join(", ")}`);
    }
    if (wordCount >= 25) {
      strengths.push("Good depth and structured explanation");
    } else {
      strengths.push("Direct and concise response");
    }

    const missingKeywords = keywords.filter((k) => !matched.includes(k));
    if (missingKeywords.length > 0) {
      improvements.push(`Consider mentioning: ${missingKeywords.slice(0, 3).join(", ")}`);
    }
    if (wordCount < 20) {
      improvements.push("Expand with real-world examples and edge cases");
    }

    return {
      score,
      strengths: strengths.length > 0 ? strengths : ["Good effort on fundamental concepts"],
      improvements: improvements.length > 0 ? improvements : ["Review ideal response for advanced nuances"],
      wordCount,
      matchedKeywords: matched
    };
  };

  const handleSaveCurrentAnswer = () => {
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    const currentQ = questions[currentIndex];
    const evaluation = evaluateAnswer(currentQ, userAnswer);

    const record = {
      questionId: currentQ.id,
      question: currentQ.question,
      idealAnswer: currentQ.idealAnswer,
      tips: currentQ.tips,
      userAnswer: userAnswer.trim(),
      evaluation
    };

    const updated = [...answersList];
    updated[currentIndex] = record;
    setAnswersList(updated);
    setIsAnswerSubmitted(true);
    return updated;
  };

  const handleTimeUp = () => {
    // Auto-record whatever is currently typed
    const updated = handleSaveCurrentAnswer();
    proceedToNext(updated);
  };

  const proceedToNext = (currentRecords = answersList) => {
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer("");
      setIsAnswerSubmitted(false);
      setSpeechError("");
    } else {
      // Complete interview
      finishInterview(currentRecords);
    }
  };

  const handleNextClick = () => {
    // Save current if not submitted
    let records = answersList;
    if (!isAnswerSubmitted) {
      records = handleSaveCurrentAnswer();
    }
    proceedToNext(records);
  };

  const handleSkip = () => {
    const currentQ = questions[currentIndex];
    const skippedRecord = {
      questionId: currentQ.id,
      question: currentQ.question,
      idealAnswer: currentQ.idealAnswer,
      tips: currentQ.tips,
      userAnswer: "Skipped by candidate",
      evaluation: {
        score: 0,
        strengths: [],
        improvements: ["Question was skipped. Practice this topic to be well prepared."],
        wordCount: 0,
        matchedKeywords: []
      }
    };
    const updated = [...answersList];
    updated[currentIndex] = skippedRecord;
    setAnswersList(updated);
    proceedToNext(updated);
  };

  const finishInterview = (finalRecords) => {
    clearInterval(timerRef.current);

    // Calculate total score
    const totalScore = finalRecords.reduce((acc, curr) => acc + (curr?.evaluation?.score || 0), 0);
    const avgScore = Math.round((totalScore / (questions.length * 10)) * 10);
    const normalizedScore = Math.min(10, Math.max(1, avgScore || 1));

    // Save report data for Feedback page
    localStorage.setItem("interviewRole", roleConfig.name);
    localStorage.setItem("interviewDifficulty", diffConfig.name);
    localStorage.setItem("totalQuestions", questions.length.toString());
    localStorage.setItem("userAnswers", JSON.stringify(finalRecords));
    localStorage.setItem("finalScore", normalizedScore.toString());

    // Save to historical progress
    const history = JSON.parse(localStorage.getItem("interviewHistory") || "[]");
    const today = new Date();
    const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    let resultTag = "Poor";
    if (normalizedScore >= 8) resultTag = "Excellent";
    else if (normalizedScore >= 6) resultTag = "Good";
    else if (normalizedScore >= 4) resultTag = "Average";

    history.push({
      id: "int_" + Date.now(),
      date: dateStr,
      timestamp: Date.now(),
      role: roleConfig.name,
      difficulty: diffConfig.name,
      score: `${normalizedScore}/10`,
      numericScore: normalizedScore,
      result: resultTag,
      totalQuestions: questions.length
    });

    localStorage.setItem("interviewHistory", JSON.stringify(history));

    // Redirect to feedback page
    navigate("/feedback");
  };

  if (questions.length === 0) {
    return (
      <>
        <Navbar />
        <div className="interview-container" style={{ textAlign: "center", padding: "60px 20px" }}>
          <div className="loading-spinner"></div>
          <p style={{ marginTop: "16px", color: "#64748b" }}>Preparing your AI interview questions...</p>
        </div>
      </>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const wordCount = userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0;
  const isTimeRunningLow = timeLeft <= 10;

  return (
    <>
      <Navbar />

      <div className="interview-container">
        {/* Header with Role, Difficulty & Live Timer */}
        <div className="interview-header">
          <div className="role-info">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>{roleConfig.icon}</span>
              <h3>{roleConfig.name}</h3>
            </div>
            <p>{diffConfig.name} Difficulty • {questions.length} Questions</p>
          </div>

          <div className={`timer ${isTimeRunningLow ? "timer-warning" : ""}`}>
            ⏱ {timeLeft}s
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section" style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#64748b" }}>
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{progressPercent}% Completed</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Current Question Card */}
        <div className="question-card">
          <div className="question-number">Question {currentIndex + 1} of {questions.length}</div>
          <div className="question-text">{currentQ?.question}</div>
          {currentQ?.tips && (
            <div className="question-hint">
              💡 <strong>Hint:</strong> {currentQ.tips}
            </div>
          )}
        </div>

        {/* Speech Error Banner */}
        {speechError && (
          <div className="alert-badge alert-error" style={{ marginBottom: "16px" }}>
            {speechError}
          </div>
        )}

        {/* Answer Input Card */}
        <div className="answer-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h3>Your Answer</h3>
            <span className="word-count-badge">{wordCount} words</span>
          </div>

          <textarea
            placeholder="Type your detailed answer here, or click 'Speak Answer' to use voice recognition..."
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              setIsAnswerSubmitted(false);
            }}
          ></textarea>

          {/* Controls */}
          <div className="answer-buttons">
            <button
              type="button"
              className={`btn-voice ${isListening ? "listening-active" : ""}`}
              onClick={toggleVoice}
            >
              {isListening ? "🔴 Listening... (Click to stop)" : "🎤 Speak Answer"}
            </button>

            <button
              type="button"
              className={`btn-primary ${isAnswerSubmitted ? "btn-submitted" : ""}`}
              onClick={handleSaveCurrentAnswer}
            >
              {isAnswerSubmitted ? "✅ Answer Saved" : "Save Answer"}
            </button>

            <button
              type="button"
              className="btn-outline"
              onClick={handleSkip}
              style={{ color: "#64748b" }}
            >
              Skip
            </button>

            <button
              type="button"
              className="btn-next"
              onClick={handleNextClick}
            >
              {currentIndex < questions.length - 1 ? "Next Question →" : "Finish Interview 🏁"}
            </button>
          </div>
        </div>

        {/* Action helper */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", fontSize: "13px" }}>
          <Link to="/select-role" className="back-link">
            ← Exit Interview
          </Link>
          <span style={{ color: "#94a3b8" }}>
            Voice answers automatically transcribe in real-time
          </span>
        </div>
      </div>
    </>
  );
}

export default Interview;
