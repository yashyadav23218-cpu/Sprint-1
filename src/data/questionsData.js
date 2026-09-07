export const ROLES_DATA = {
  mern: {
    id: "mern",
    name: "MERN Stack Developer",
    icon: "⚛️",
    description: "MongoDB, Express.js, React.js, Node.js Fullstack Development",
    questions: {
      easy: [
        {
          id: "mern-e1",
          question: "What is the MERN Stack and what role does each component play?",
          keywords: ["mongodb", "express", "react", "node", "database", "backend", "frontend", "javascript", "fullstack"],
          idealAnswer: "MERN stands for MongoDB (NoSQL database for storing JSON-like documents), Express.js (backend web application framework for Node.js), React.js (declarative frontend library for building user interfaces), and Node.js (JavaScript runtime environment that executes JS code outside the browser). Together, they allow developers to build full-stack web applications entirely using JavaScript.",
          tips: "Highlight that it provides an end-to-end JavaScript environment."
        },
        {
          id: "mern-e2",
          question: "What is React and what are its key features?",
          keywords: ["component", "virtual dom", "state", "props", "declarative", "jsx", "reusable", "hooks"],
          idealAnswer: "React is an open-source front-end JavaScript library maintained by Meta for building component-based user interfaces. Key features include the Virtual DOM for fast and optimized rendering, reusable component architecture, unidirectional data flow, JSX syntax, and Hooks for stateful functional components.",
          tips: "Mention Virtual DOM and Component reusability."
        },
        {
          id: "mern-e3",
          question: "What is Node.js and how does the event loop work?",
          keywords: ["runtime", "v8", "event loop", "single-threaded", "non-blocking", "asynchronous", "i/o", "libuv"],
          idealAnswer: "Node.js is a server-side JavaScript runtime built on Chrome's V8 engine. It is single-threaded and uses an asynchronous, non-blocking I/O event-driven model powered by libuv. The event loop continuously checks the call stack and offloads I/O operations to worker threads, processing callbacks in appropriate queues when ready.",
          tips: "Emphasize non-blocking asynchronous nature."
        },
        {
          id: "mern-e4",
          question: "What is MongoDB and how is it different from relational databases (SQL)?",
          keywords: ["nosql", "document", "bson", "json", "schema-less", "flexible", "collections", "scalability", "sql"],
          idealAnswer: "MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like BSON format. Unlike SQL databases with rigid schemas and tables with rows/columns, MongoDB uses dynamic collections and documents, allowing easier horizontal scaling and high performance with unstructured data.",
          tips: "Compare documents/collections to rows/tables."
        },
        {
          id: "mern-e5",
          question: "What is Express.js and what is middleware in Express?",
          keywords: ["middleware", "routing", "req", "res", "next", "framework", "rest", "api"],
          idealAnswer: "Express.js is a minimal and flexible Node.js web application framework that provides robust routing and middleware capabilities. Middleware functions are functions that have access to the request object (req), response object (res), and the next middleware function in the application’s request-response cycle.",
          tips: "Explain how middleware can modify req/res or end the cycle."
        }
      ],
      medium: [
        {
          id: "mern-m1",
          question: "Explain the Virtual DOM and how React's reconciliation algorithm works.",
          keywords: ["virtual dom", "reconciliation", "diffing", "fiber", "render", "re-render", "performance", "batching"],
          idealAnswer: "The Virtual DOM is an in-memory lightweight representation of the real DOM. When state changes, React creates a new Virtual DOM tree, diffs it against the previous tree using its heuristic Diffing algorithm (React Fiber), and efficiently batches updates to only modify the minimal changed elements in the real browser DOM.",
          tips: "Discuss how diffing algorithm minimizes real DOM manipulation."
        },
        {
          id: "mern-m2",
          question: "How do you handle authentication and authorization in a MERN application?",
          keywords: ["jwt", "token", "bcrypt", "cookies", "headers", "authorization", "middleware", "localstorage", "refresh"],
          idealAnswer: "Authentication is typically handled using JSON Web Tokens (JWT) and bcrypt for password hashing. When a user logs in, the backend verifies credentials, signs a JWT (or HttpOnly cookie), and sends it to the client. Subsequent requests include this token in the Authorization header. Express middleware verifies the token and user permissions before granting route access.",
          tips: "Mention HttpOnly cookies or Authorization header with JWT."
        },
        {
          id: "mern-m3",
          question: "What is the difference between SQL JOINs and MongoDB Aggregation / Mongoose Populate?",
          keywords: ["aggregation", "lookup", "populate", "references", "embedding", "join", "performance", "denormalization"],
          idealAnswer: "SQL uses JOIN operations to combine normalized relational tables at query time. In MongoDB, relationships can be modeled via embedded subdocuments or normalized document references. The `$lookup` aggregation stage performs left outer joins across collections, while Mongoose's `populate()` automatically fetches referenced documents using separate queries.",
          tips: "Contrast $lookup with Mongoose populate and SQL JOINs."
        },
        {
          id: "mern-m4",
          question: "Explain the purpose of React useEffect hook and how cleanup functions work.",
          keywords: ["useeffect", "lifecycle", "side effects", "dependency array", "cleanup", "unmount", "memory leak", "subscriptions"],
          idealAnswer: "The `useEffect` hook allows functional components to perform side effects such as data fetching, subscriptions, and manual DOM mutations. The optional dependency array controls when it runs (on mount, on state changes, or every render). Returning a cleanup function allows canceling timers, event listeners, or network requests before unmounting or re-running.",
          tips: "Provide an example like clearing a setInterval or aborting fetch."
        },
        {
          id: "mern-m5",
          question: "How do you optimize the performance of a React and Node.js application?",
          keywords: ["memo", "lazy", "code splitting", "indexing", "caching", "redis", "compression", "pagination"],
          idealAnswer: "Frontend optimizations include code splitting with `React.lazy` and `Suspense`, memoization with `React.memo`, `useMemo`, and `useCallback`, and image optimization. Backend optimizations include MongoDB indexing, database query pagination, server-side caching with Redis, Gzip compression, and connection pooling.",
          tips: "Cover both frontend (code splitting, memo) and backend (indexing, caching)."
        }
      ],
      hard: [
        {
          id: "mern-h1",
          question: "How does React 18/19 Server Components and Concurrent Mode differ from standard Client-Side Rendering?",
          keywords: ["server components", "rsc", "concurrent", "suspense", "hydration", "streaming", "bundle size", "transitions"],
          idealAnswer: "React Server Components (RSC) execute exclusively on the server, generating zero client-side JavaScript bundle overhead for non-interactive components while enabling direct access to server-side databases and APIs. Concurrent Mode allows React to interrupt, pause, and prioritize render trees using transitions (`useTransition`, `startTransition`), ensuring user input remains responsive during heavy renders.",
          tips: "Focus on zero-bundle size for RSC and interruptible rendering in Concurrent Mode."
        },
        {
          id: "mern-h2",
          question: "How would you design a scalable real-time chat architecture in the MERN stack for millions of concurrent users?",
          keywords: ["websocket", "socket.io", "redis pub/sub", "horizontal scaling", "load balancer", "clustering", "mongodb replica set", "sharding"],
          idealAnswer: "I would use Socket.IO/WebSockets with sticky sessions behind an NGINX or AWS ALB load balancer. Node.js backend nodes would be horizontally scaled in Kubernetes with Redis Pub/Sub adapter to broadcast messages across server instances. MongoDB would use sharding and replica sets for horizontal partitioning, with message history cached in Redis or saved in time-series collections.",
          tips: "Highlight horizontal scaling, Redis Pub/Sub, and load balancing."
        },
        {
          id: "mern-h3",
          question: "Explain microservices communication, distributed transactions, and Saga pattern in Node.js.",
          keywords: ["microservices", "saga", "event-driven", "kafka", "rabbitmq", "distributed transactions", "compensation", "cqrs"],
          idealAnswer: "In distributed Node.js microservices, direct 2-phase commit is impractical. Instead, the Saga Pattern orchestrates distributed transactions through choreographies (event-driven with Kafka/RabbitMQ) or orchestrators. If any step fails, compensating transactions are executed in reverse to rollback the system into a consistent state.",
          tips: "Discuss choreographies vs orchestration and compensating transactions."
        }
      ]
    }
  },
  java: {
    id: "java",
    name: "Java Developer",
    icon: "☕",
    description: "Core Java, OOPs, Spring Boot, Hibernate, Microservices",
    questions: {
      easy: [
        {
          id: "java-e1",
          question: "What is Java and what are its core features?",
          keywords: ["platform independent", "byte code", "jvm", "oops", "garbage collection", "robust", "multithreaded", "portable"],
          idealAnswer: "Java is an object-oriented, class-based, robust, and secure programming language. Its core 'Write Once, Run Anywhere' (WORA) feature is achieved by compiling source code into bytecode, which runs on the Java Virtual Machine (JVM) across any operating system. It features automatic memory management via garbage collection.",
          tips: "Mention bytecode and JVM platform independence."
        },
        {
          id: "java-e2",
          question: "Explain the four pillars of Object-Oriented Programming (OOP) in Java.",
          keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction", "classes", "objects", "interfaces"],
          idealAnswer: "The four pillars are: 1) Encapsulation (binding data and methods together with private access modifiers and getters/setters), 2) Inheritance (inheriting properties from superclasses via `extends`), 3) Polymorphism (method overloading and method overriding), and 4) Abstraction (hiding implementation details using abstract classes and interfaces).",
          tips: "Name and briefly explain each pillar."
        },
        {
          id: "java-e3",
          question: "What is the difference between JDK, JRE, and JVM?",
          keywords: ["jdk", "jre", "jvm", "development kit", "runtime environment", "virtual machine", "compiler", "javac"],
          idealAnswer: "JVM (Java Virtual Machine) executes the Java bytecode. JRE (Java Runtime Environment) contains the JVM plus core runtime libraries necessary to run Java applications. JDK (Java Development Kit) is the complete software bundle containing the JRE, compiler (`javac`), debugger, and development tools required to write and build Java code.",
          tips: "JDK contains JRE, and JRE contains JVM."
        },
        {
          id: "java-e4",
          question: "What is the difference between ArrayList and LinkedList in Java?",
          keywords: ["arraylist", "linkedlist", "dynamic array", "nodes", "pointer", "time complexity", "retrieval", "insertion"],
          idealAnswer: "ArrayList is backed by a resizable dynamic array, providing O(1) random access lookup by index but O(n) worst-case insertions/deletions due to element shifting. LinkedList is backed by a doubly-linked list of nodes, providing O(1) insertions/deletions at ends but O(n) positional lookup.",
          tips: "Compare time complexities for random access vs insertion."
        },
        {
          id: "java-e5",
          question: "What is Exception Handling in Java and what is the difference between Checked and Unchecked exceptions?",
          keywords: ["try", "catch", "finally", "throw", "throws", "checked", "unchecked", "runtimeexception", "compile-time"],
          idealAnswer: "Exception handling maintains normal application flow using `try`, `catch`, `finally`, `throw`, and `throws`. Checked exceptions (e.g., IOException, SQLException) are verified at compile time and must be handled. Unchecked exceptions (subclasses of RuntimeException like NullPointerException, ArrayIndexOutOfBoundsException) occur at runtime.",
          tips: "Give clear examples of checked vs unchecked exceptions."
        }
      ],
      medium: [
        {
          id: "java-m1",
          question: "What is Spring Boot and how does Inversion of Control (IoC) and Dependency Injection (DI) work?",
          keywords: ["spring boot", "ioc", "dependency injection", "autowired", "beans", "applicationcontext", "loose coupling"],
          idealAnswer: "Spring Boot simplifies Spring framework setup with auto-configuration and embedded servers. IoC shifts object creation and lifecycle management from the programmer to the Spring IoC Container (ApplicationContext). Dependency Injection (DI) is the pattern where dependencies are injected into classes (via `@Autowired` constructor or field injection) to achieve loose coupling.",
          tips: "Explain how IoC container manages Bean lifecycles."
        },
        {
          id: "java-m2",
          question: "What is Hibernate and explain the difference between get() and load() methods?",
          keywords: ["hibernate", "orm", "session", "lazy loading", "eager loading", "proxy", "null", "objectnotfoundexception"],
          idealAnswer: "Hibernate is an Object-Relational Mapping (ORM) framework for mapping Java classes to database tables. The `get()` method hits the database immediately (eager) and returns `null` if the record does not exist. The `load()` method returns a lazy proxy object without querying the database until a property is accessed, throwing `ObjectNotFoundException` if the record doesn't exist.",
          tips: "Highlight proxy vs direct DB query and null handling."
        },
        {
          id: "java-m3",
          question: "How does Garbage Collection and Memory Management work in Java?",
          keywords: ["heap", "stack", "young generation", "old generation", "eden", "survivor", "metaspace", "mark and sweep"],
          idealAnswer: "Java memory is divided into Stack (method frames and primitive references) and Heap (objects and class instances). The Heap is organized into Young Generation (Eden and Survivor spaces) and Old/Tenured Generation. Garbage collectors (e.g., G1, ZGC) use the Mark-and-Sweep algorithm to reclaim memory from unreachable objects through minor and major GC cycles.",
          tips: "Mention Eden, Survivor, and Tenured spaces."
        }
      ],
      hard: [
        {
          id: "java-h1",
          question: "Explain Java Concurrency: synchronized, volatile, Lock API, and Atomic variables.",
          keywords: ["volatile", "synchronized", "reentrantlock", "atomic", "cas", "thread safety", "memory barrier", "deadlock"],
          idealAnswer: "`synchronized` acquires an intrinsic object monitor to guarantee mutual exclusion and memory visibility. `volatile` prevents compiler optimizations and forces direct read/write from main memory with memory barriers, guaranteeing visibility but not atomicity. `ReentrantLock` offers flexible locking with timed and interruptible locks. Atomic classes use hardware-level Compare-And-Swap (CAS) for non-blocking lock-free thread safety.",
          tips: "Explain CAS for atomics and visibility guarantees for volatile."
        },
        {
          id: "java-h2",
          question: "How do you implement resilient Microservices in Java with Spring Cloud and Resilience4j?",
          keywords: ["circuit breaker", "resilience4j", "rate limiter", "bulkhead", "eureka", "gateway", "fallback", "retry"],
          idealAnswer: "Microservices resiliency is achieved using Resilience4j patterns: Circuit Breaker (opens circuit on high failure rate to prevent cascading outages and routes to fallbacks), Retry with exponential backoff, Rate Limiting to prevent overload, and Bulkheads to isolate resource pools. Spring Cloud Gateway handles routing and API governance.",
          tips: "Explain the Closed, Open, and Half-Open states of a Circuit Breaker."
        }
      ]
    }
  },
  python: {
    id: "python",
    name: "Python Developer",
    icon: "🐍",
    description: "Core Python, Django, FastAPI, Data Structures, OOPs",
    questions: {
      easy: [
        {
          id: "py-e1",
          question: "What is Python and why is it so widely used?",
          keywords: ["interpreted", "dynamically typed", "syntax", "readability", "batteries included", "libraries", "versatile"],
          idealAnswer: "Python is an interpreted, high-level, dynamically typed, multi-paradigm programming language. It is renowned for its clean and readable syntax, rich standard library ('batteries included'), and massive ecosystem of packages for web development (Django, FastAPI), data science (Pandas, NumPy), and AI/machine learning.",
          tips: "Emphasize readability and versatile ecosystem."
        },
        {
          id: "py-e2",
          question: "What is the difference between a List and a Tuple in Python?",
          keywords: ["list", "tuple", "mutable", "immutable", "brackets", "parentheses", "memory", "hashable", "performance"],
          idealAnswer: "Lists are mutable sequences defined using square brackets `[]` where elements can be modified, appended, or deleted. Tuples are immutable sequences defined using parentheses `()` whose contents cannot be altered after creation. Because tuples are immutable, they are memory-efficient, faster, and can be used as dictionary keys if their items are hashable.",
          tips: "Key difference is mutability and hashability."
        },
        {
          id: "py-e3",
          question: "What are Decorators in Python and how do they work?",
          keywords: ["decorator", "higher-order function", "wrapper", "closure", "syntactic sugar", "@", "arguments"],
          idealAnswer: "Decorators are functions that take another function as an argument, extend or modify its behavior without modifying its source code, and return the modified wrapper function. They use the `@decorator_name` syntactic sugar syntax, commonly used for logging, authentication, timing, and caching.",
          tips: "Mention wrapper function and @ syntax."
        },
        {
          id: "py-e4",
          question: "What is a Lambda function and when should you use it?",
          keywords: ["anonymous", "lambda", "inline", "single expression", "map", "filter", "sorted", "functional"],
          idealAnswer: "A lambda function is a small anonymous inline function defined with the `lambda` keyword that can take any number of arguments but can only contain a single expression whose evaluated value is returned. They are best used for short, one-time callbacks in functions like `map()`, `filter()`, or `sorted(key=lambda x: ...)`.",
          tips: "Highlight single-expression anonymous nature."
        },
        {
          id: "py-e5",
          question: "What is the difference between deepcopy and shallowcopy in Python?",
          keywords: ["copy", "shallow", "deep", "references", "nested objects", "copy module", "independent"],
          idealAnswer: "A shallow copy (`copy.copy()`) creates a new container object but inserts references to the original nested child objects; modifying a nested object affects both copies. A deep copy (`copy.deepcopy()`) recursively copies the outer object and all nested objects, creating an entirely independent clone.",
          tips: "Explain how nested objects are affected in each."
        }
      ],
      medium: [
        {
          id: "py-m1",
          question: "Explain the Global Interpreter Lock (GIL) in Python and its impact on multithreading.",
          keywords: ["gil", "global interpreter lock", "cpython", "thread safety", "multiprocessing", "cpu bound", "io bound", "mutex"],
          idealAnswer: "The GIL is a mutex in CPython that ensures only one native thread executes Python bytecode at any given moment to ensure CPython memory management and reference counting are thread-safe. As a result, multithreading does not speed up CPU-bound tasks in Python. For CPU-bound concurrency, developers use the `multiprocessing` module or Celery.",
          tips: "Contrast CPU-bound tasks (multiprocessing) with I/O-bound tasks (multithreading/asyncio)."
        },
        {
          id: "py-m2",
          question: "What are Generators and how does the `yield` keyword differ from `return`?",
          keywords: ["generator", "yield", "iterator", "lazy evaluation", "memory efficient", "next", "state preservation"],
          idealAnswer: "A generator is a special function that returns an iterator. When `yield` is encountered, it produces a value and suspends the function’s execution state, allowing it to resume on the next call to `next()`. Unlike `return` which terminates execution and returns all data at once in memory, generators compute values lazily on demand, making them highly memory efficient for large datasets.",
          tips: "Emphasize lazy evaluation and state preservation."
        },
        {
          id: "py-m3",
          question: "Compare Django vs FastAPI for modern web service architecture.",
          keywords: ["django", "fastapi", "orm", "batteries included", "async", "pydantic", "openapi", "performance", "type hints"],
          idealAnswer: "Django is a full-featured 'batteries-included' synchronous web framework with built-in ORM, admin panel, authentication, and templating, ideal for full monolithic applications. FastAPI is a modern, high-performance, asynchronous micro-framework built on Starlette and Pydantic, leveraging Python type hints, native `async/await`, and auto-generated OpenAPI documentation for high-speed REST APIs.",
          tips: "Highlight asynchronous performance, Pydantic, and OpenAPI generation in FastAPI."
        }
      ],
      hard: [
        {
          id: "py-h1",
          question: "How does Python's memory management and garbage collection handle circular references?",
          keywords: ["reference counting", "cyclic garbage collector", "gc module", "generations", "weakref", "memory leak"],
          idealAnswer: "CPython primary memory management relies on Reference Counting. When an object's reference count drops to 0, its memory is instantly deallocated. To handle circular references (e.g., Object A references B and B references A), Python employs a generational cyclic garbage collector that tracks container objects across three generations (0, 1, 2) using double-linked ring lists and heuristics to detect and collect unreachable reference cycles.",
          tips: "Explain reference counting + generational cyclic collector."
        }
      ]
    }
  },
  data: {
    id: "data",
    name: "Data Analyst",
    icon: "📊",
    description: "SQL, Excel, Python Pandas, Data Visualization, Statistics",
    questions: {
      easy: [
        {
          id: "da-e1",
          question: "What is Data Analysis and what are the main steps in a typical data analysis project?",
          keywords: ["collection", "cleaning", "eda", "exploration", "modeling", "visualization", "interpretation", "insights"],
          idealAnswer: "Data Analysis is the systematic process of inspecting, cleansing, transforming, and modeling data to discover useful insights, inform conclusions, and support decision-making. Main steps include: 1) Defining the business problem, 2) Data collection, 3) Data cleaning/preprocessing, 4) Exploratory Data Analysis (EDA), 5) Statistical modeling/analysis, and 6) Data visualization and reporting.",
          tips: "Walk through the end-to-end data lifecycle."
        },
        {
          id: "da-e2",
          question: "What is the difference between SQL and NoSQL databases?",
          keywords: ["relational", "structured", "schema", "tables", "documents", "acid", "horizontal scaling", "joins"],
          idealAnswer: "SQL databases (e.g., PostgreSQL, MySQL) are relational, table-based, and enforce strict predefined schemas with strong ACID compliance and structured relationships using JOINs. NoSQL databases (e.g., MongoDB, Cassandra) are non-relational, document/key-value/graph based, schema-flexible, and optimized for horizontal scaling with unstructured data.",
          tips: "Contrast structured relational tables with flexible documents."
        },
        {
          id: "da-e3",
          question: "What is a Pivot Table and why is it used in data analysis?",
          keywords: ["pivot table", "aggregation", "summary", "rows", "columns", "values", "excel", "grouping"],
          idealAnswer: "A Pivot Table is an interactive data summarization tool in Excel, SQL, and Pandas that automatically sorts, counts, totals, or averages data stored in one large table into a compact summary table. It allows analysts to rapidly slice, dice, and view multidimensional relationships without writing complex code.",
          tips: "Give an example of summarizing revenue by region and month."
        },
        {
          id: "da-e4",
          question: "What is the difference between Mean, Median, and Mode, and when should you use each?",
          keywords: ["mean", "median", "mode", "average", "outliers", "skewed", "distribution", "categorical"],
          idealAnswer: "Mean is the mathematical average (sum divided by count), which is sensitive to extreme outliers. Median is the middle value when sorted, making it ideal for skewed distributions (e.g., salaries or house prices). Mode is the most frequently occurring value, best suited for categorical data.",
          tips: "Highlight the impact of outliers on the mean vs median."
        },
        {
          id: "da-e5",
          question: "What is data cleaning and what are common techniques to handle missing values?",
          keywords: ["imputation", "drop", "mean", "median", "mode", "duplicates", "outliers", "null", "preprocessing"],
          idealAnswer: "Data cleaning is the process of detecting and correcting corrupt, inaccurate, or missing records. Techniques for handling missing data include: 1) Dropping rows or columns with high missingness (`dropna`), 2) Imputing with statistical measures like mean, median, or mode (`fillna`), 3) Advanced imputation via KNN or regression models, or 4) Forward/backward fill for time series data.",
          tips: "Mention imputation strategies and when dropping is acceptable."
        }
      ],
      medium: [
        {
          id: "da-m1",
          question: "Explain the differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN in SQL.",
          keywords: ["inner join", "left join", "right join", "full outer join", "nulls", "matching", "keys"],
          idealAnswer: "INNER JOIN returns only records that have matching values in both tables. LEFT JOIN returns all records from the left table and matched records from the right table (with NULLs for unmatched right rows). RIGHT JOIN returns all records from the right table and matched left records. FULL OUTER JOIN returns all records when there is a match in either left or right table.",
          tips: "Describe Venn diagram relationships and NULL outputs."
        },
        {
          id: "da-m2",
          question: "What are SQL Window Functions and how do `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` differ?",
          keywords: ["window function", "over", "partition by", "order by", "rank", "dense_rank", "row_number", "ties"],
          idealAnswer: "Window functions perform calculations across a set of table rows related to the current row without collapsing rows like `GROUP BY`. `ROW_NUMBER()` assigns unique sequential integers regardless of ties. `RANK()` assigns identical ranks to ties but skips subsequent rank numbers (1, 2, 2, 4). `DENSE_RANK()` assigns identical ranks to ties without skipping numbers (1, 2, 2, 3).",
          tips: "Provide an example of duplicate values ranking."
        }
      ],
      hard: [
        {
          id: "da-h1",
          question: "How do you detect and handle multicollinearity in regression analysis, and what is VIF?",
          keywords: ["multicollinearity", "vif", "variance inflation factor", "correlation", "regression", "p-value", "coefficients", "feature selection"],
          idealAnswer: "Multicollinearity occurs when independent variables in a regression model are highly correlated, leading to unstable coefficient estimates and high standard errors. It is detected using correlation matrices and the Variance Inflation Factor (VIF). A VIF score > 5 or 10 indicates severe multicollinearity. Solutions include removing collinear features, combining them using PCA/feature engineering, or using Ridge/Lasso regularization.",
          tips: "Explain VIF threshold (>5 or >10) and regularization solutions."
        }
      ]
    }
  },
  frontend: {
    id: "frontend",
    name: "Frontend Developer",
    icon: "💻",
    description: "HTML5, CSS3, Modern JavaScript, React, Web Performance, A11y",
    questions: {
      easy: [
        {
          id: "fe-e1",
          question: "What is the difference between HTML, CSS, and JavaScript?",
          keywords: ["html", "css", "javascript", "structure", "styling", "interactivity", "dom", "behavior"],
          idealAnswer: "HTML (HyperText Markup Language) provides the structure and semantic skeleton of the webpage. CSS (Cascading Style Sheets) controls the visual presentation, styling, layout, and responsiveness. JavaScript provides dynamic functionality, interactivity, asynchronous data fetching, and DOM manipulation.",
          tips: "Use the analogy: HTML is the skeleton, CSS is the skin/clothes, and JavaScript is the muscle/brain."
        },
        {
          id: "fe-e2",
          question: "What is Responsive Web Design and how do Media Queries work?",
          keywords: ["responsive", "media queries", "viewport", "mobile first", "breakpoints", "flexbox", "grid", "fluid"],
          idealAnswer: "Responsive Web Design ensures that web pages render well across a variety of devices, screen sizes, and orientations. It uses flexible grid layouts, fluid images, and CSS Media Queries (`@media (max-width: 768px)`) to apply specific styles based on viewport dimensions, device capabilities, and pixel density.",
          tips: "Mention mobile-first approach and flexible grids."
        },
        {
          id: "fe-e3",
          question: "What is the difference between CSS Flexbox and CSS Grid?",
          keywords: ["flexbox", "grid", "one-dimensional", "two-dimensional", "row", "column", "layout", "axis"],
          idealAnswer: "CSS Flexbox is a 1-dimensional layout system designed for distributing space and aligning items along a single axis (either row or column). CSS Grid is a 2-dimensional layout system designed for complex layouts involving simultaneous rows and columns.",
          tips: "Flexbox is 1D (content-first), Grid is 2D (layout-first)."
        },
        {
          id: "fe-e4",
          question: "What is the Document Object Model (DOM) and how does JavaScript interact with it?",
          keywords: ["dom", "tree", "nodes", "elements", "events", "queryselector", "manipulation", "api"],
          idealAnswer: "The DOM is a tree-like object representation of the HTML document created by the browser. JavaScript uses DOM APIs (such as `document.querySelector`, `addEventListener`, `createElement`) to traverse, modify elements, handle user events, and update content dynamically in real time.",
          tips: "Explain DOM as a hierarchical tree of nodes."
        },
        {
          id: "fe-e5",
          question: "What is the difference between localStorage, sessionStorage, and Cookies?",
          keywords: ["localstorage", "sessionstorage", "cookies", "persistence", "expiration", "storage size", "tab", "server"],
          idealAnswer: "localStorage stores up to ~5-10MB with no expiration date until explicitly cleared. sessionStorage stores data only for the duration of the browser tab session. Cookies store smaller data (~4KB) with explicit expiration dates and are automatically sent to the server with every HTTP request.",
          tips: "Compare capacity, expiration, and whether data is sent to the server."
        }
      ],
      medium: [
        {
          id: "fe-m1",
          question: "What are Closures in JavaScript and where are they useful?",
          keywords: ["closure", "lexical scope", "outer function", "inner function", "private variables", "data encapsulation", "state"],
          idealAnswer: "A closure is the combination of a function bundled together with references to its lexical environment. An inner function retains access to variables in its outer enclosing function even after the outer function has finished executing. Closures are useful for data privacy, currying, and memoization.",
          tips: "Give an example of a counter or private variable factory."
        },
        {
          id: "fe-m2",
          question: "Explain Core Web Vitals: LCP, INP, and CLS.",
          keywords: ["lcp", "inp", "cls", "core web vitals", "largest contentful paint", "interaction to next paint", "cumulative layout shift", "performance"],
          idealAnswer: "Core Web Vitals are Google metrics measuring real-world user experience: 1) Largest Contentful Paint (LCP) measures perceived loading speed of main hero content (< 2.5s is good), 2) Interaction to Next Paint (INP) measures responsiveness and latency to user interactions (< 200ms is good), and 3) Cumulative Layout Shift (CLS) measures visual stability and unexpected layout shifts (< 0.1 is good).",
          tips: "Define all three metrics and their targets."
        }
      ],
      hard: [
        {
          id: "fe-h1",
          question: "How does the browser rendering pipeline work (Parsing, DOM/CSSOM, Render Tree, Layout, Paint, Compositing)?",
          keywords: ["render tree", "dom", "cssom", "layout", "reflow", "paint", "compositing", "gpu", "critical rendering path"],
          idealAnswer: "The browser downloads HTML to build the DOM and CSS to build the CSSOM. Combining both creates the Render Tree. The Layout (or Reflow) phase calculates the exact geometry, position, and dimensions of each visible node. The Paint phase rasterizes pixels into layers. Finally, the Compositing step combines layers on the GPU to draw the pixels onto the screen.",
          tips: "List all steps from HTML stream to composite layer on GPU."
        }
      ]
    }
  }
};

export const DIFFICULTY_CONFIG = {
  easy: {
    name: "Easy",
    timePerQuestion: 60,
    badgeClass: "badge-easy",
    description: "Foundational questions, 60s per answer"
  },
  medium: {
    name: "Medium",
    timePerQuestion: 45,
    badgeClass: "badge-medium",
    description: "In-depth technical questions, 45s per answer"
  },
  hard: {
    name: "Hard",
    timePerQuestion: 30,
    badgeClass: "badge-hard",
    description: "Advanced architecture & edge-cases, 30s per answer"
  }
};
