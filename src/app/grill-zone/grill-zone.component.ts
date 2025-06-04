import { Component } from '@angular/core';

interface QAItem {
  id: number;
  question: string;
  answer?: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-grill-zone',
  templateUrl: './grill-zone.component.html',
  styleUrls: ['./grill-zone.component.scss']
})
export class GrillZoneComponent {
  toggle(item: QAItem) {
    item.expanded = !item.expanded;
  }

  // The full list of questions (with answers if provided)
  qaList: QAItem[] = [
    {
      id: 1,
      question: 'let vs var vs const',
      answer: `
- **var**: Function-scoped (or global-scoped if outside a function). Can be re-assigned and re-declared. Hoisted (initialized as undefined).
- **let**: Block-scoped. Can be re-assigned but not re-declared in the same scope. Hoisted but not initialized (temporal dead zone until declaration).
- **const**: Block-scoped. Cannot be re-assigned or re-declared. Must be initialized at declaration. Also hoisted but in a temporal dead zone until declaration.
      `.trim()
    },
    {
      id: 2,
      question: 'NgModule Decorator',
      answer: `
- The \`@NgModule\` decorator defines an Angular module. It has metadata properties like:
  - \`declarations\`: components, directives, pipes owned by this module.
  - \`imports\`: other modules whose exported classes are needed.
  - \`providers\`: services that should be available to all components in this module.
  - \`bootstrap\`: the root component to bootstrap when this module is used to launch the app.
      `.trim()
    },
    {
      id: 3,
      question: 'Can we have multiple NgModule?',
      answer: `
- Yes, an Angular application is built from many \`@NgModule\` classes. Each feature or lazy-loaded area is its own NgModule.
      `.trim()
    },
    {
      id: 4,
      question: `Lazy Loading vs Eager Loading vs Preload loading `,
      answer: `
- **Eager Loading**: Imports all feature modules up front. Every module is bundled and downloaded when the app starts.
- **Lazy Loading**: Defers loading of a feature module until the user navigates to a route that requires it. Reduces initial bundle size.
- **Preload Loading**: A hybrid approach—lazy modules are automatically fetched in the background once the main app loads, so they’re ready when needed, but not part of the initial bundle.
      `.trim()
    },
    {
      id: 5,
      question: 'navigateByUrl vs navigate ',
      answer: `
- \`router.navigateByUrl('/path')\`: You pass a URL string directly.
- \`router.navigate(['/path', param1, param2])\`: You pass an array of path segments (and optional parameters). Angular builds the URL for you.
      `.trim()
    },
    {
      id: 6,
      question: `QueryParams ?`,
      answer: `
- **queryParams**: Appends key/value pairs to the URL after a question mark (e.g., \`/list?page=2&sort=asc\`). These survive a page refresh and can be read via \`ActivatedRoute.queryParams\`:
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params); 
    });
  }`.trim()
    },
    {
      id: 7,
      question: `state => Used to pass sensitive data so it can't be exposed in URL; it is accessed using ActivatedRoute snapshot.`,
      answer: `
    - **State**: You can pass an object when navigating so data isn’t visible in the URL:
    
    \`\`\`ts
    this.router.navigate(['/detail'], { state: { secretInfo: 123 } });
    \`\`\`
    
    Then in the destination component:
    
    \`\`\`ts
    constructor(private route: ActivatedRoute, private router: Router) {
      const stateData = this.router.getCurrentNavigation()?.extras.state;
      console.log(stateData); // { secretInfo: 123 }
    }
    \`\`\`
    `.trim()
    },
    {
      id: 8,
      question: `JavaScript (Beginner): What is the difference between var, let, and const?`,
      answer: `
    - **var**: Function-scoped or global-scoped if declared outside a function. Can be re-declared and re-assigned. Hoisted (initialized as undefined).
    - **let**: Block-scoped. Can be re-assigned but not re-declared in the same scope. Hoisted but uninitialized until its declaration (temporal dead zone).
    - **const**: Block-scoped. Must be initialized at declaration and cannot be re-assigned or re-declared. Hoisted but remains uninitialized in the temporal dead zone until its declaration.
    
    Example:
    \`\`\`js
    // var
    console.log(a); // undefined (hoisted)
    var a = 5;
    a = 10;        // OK
    var a = 20;   // OK
    
    // let
    // console.log(b); // ReferenceError (temporal dead zone)
    let b = 5;
    b = 10;        // OK
    // let b = 20;  // SyntaxError (cannot re-declare in same scope)
    
    // const
    // console.log(c); // ReferenceError (temporal dead zone)
    const c = 5;
    // c = 10;      // TypeError (cannot re-assign)
    // const c = 20;// SyntaxError (cannot re-declare)
    \`\`\`
        `.trim()
    },
    {
      id: 9,
      question: `TypeScript (Beginner): What is an interface in TypeScript, and how does it differ from a type alias?`,
      answer: `
    - **Interface**: Defines a contract for the shape of an object (properties and method signatures). Can be implemented by classes or extended by other interfaces.
    - **Type Alias**: Creates a new name for any type (primitive, union, intersection, tuple, etc.). More flexible than interfaces but cannot be reopened/merged.
    
    Example (interface):
    \`\`\`ts
    interface User {
      id: number;
      name: string;
      isActive?: boolean; // optional property
    }
    
    class Customer implements User {
      constructor(public id: number, public name: string, public isActive = true) {}
    }
    \`\`\`
    
    Example (type alias):
    \`\`\`ts
    type StringOrNumber = string | number;
    type Point = { x: number; y: number };
    
    function logId(id: StringOrNumber) {
      console.log(id);
    }
    \`\`\`
    
    Differences:
    - Interfaces can be merged (declaration merging), type aliases cannot.
    - Type aliases can represent union/intersection types; interfaces cannot directly do unions.
        `.trim()
    },
    {
      id: 10,
      question: `Angular (Beginner): What is a Component in Angular and how do you create one?`,
      answer: `
    - An **Angular Component** is a class decorated with \`@Component\` that controls a region of the UI (its view). It consists of:
      1. **Selector**: Custom HTML tag name.
      2. **Template**: Inline HTML or external \`.html\` file.
      3. **Styles**: Inline CSS or external \`.css/ .scss\` file.
      4. **Class**: Contains data and logic.
    
    To generate a component using the Angular CLI:
    \`\`\`bash
    ng generate component my-sample-component
    # or shorthand
    ng g c my-sample-component
    \`\`\`
    
    This creates:
    \`\`\`
    src/app/my-sample-component/
      my-sample-component.component.ts
      my-sample-component.component.html
      my-sample-component.component.scss
      my-sample-component.component.spec.ts
    \`\`\`
    
    Example of a simple component:
    \`\`\`ts
    import { Component } from '@angular/core';
    
    @Component({
      selector: 'app-greeting',
      template: \`
        <h1>Hello, {{ name }}!</h1>
      \`,
      styles: [\`
        h1 { color: teal; }
      \`]
    })
    export class GreetingComponent {
      name: string = 'Angular';
    }
    \`\`\`
        `.trim()
    },
    {
      id: 11,
      question: `JavaScript (Intermediate): Explain closures and give a real-world use case.`,
      answer: `
    A **closure** is a function that retains access to its lexical scope (outer variables) even after the outer function has returned. Closures are useful for:
    1. **Data privacy**: Encapsulating variables that cannot be accessed from outside.
    2. **Partial application / currying**: Pre-loading arguments.
    
    Example (data privacy):
    \`\`\`js
    function counterFactory() {
      let count = 0;
      return {
        increment() {
          count++;
          console.log(count);
        },
        reset() {
          count = 0;
          console.log('Reset to', count);
        }
      };
    }
    
    const counter = counterFactory();
    counter.increment(); // 1
    counter.increment(); // 2
    // console.log(counter.count); // undefined (count is private)
    counter.reset();     // Reset to 0
    \`\`\`
    
    Here, \`increment\` and \`reset\` form closures over the \`count\` variable. The only way to change \`count\` is via those methods.
        `.trim()
    },
    {
      id: 12,
      question: `TypeScript (Intermediate): What are Generics and how do you use them in functions and classes?`,
      answer: `
    **Generics** allow you to write reusable code that works with a variety of types, preserving type safety. Use angle brackets \`<T>\` to define a generic type placeholder.
    
    Example (generic function):
    \`\`\`ts
    function identity<T>(arg: T): T {
      return arg;
    }
    
    // Usage:
    const str = identity<string>('hello'); // inferred: T = string
    const num = identity(123);             // inferred: T = number
    \`\`\`
    
    Example (generic interface):
    \`\`\`ts
    interface ApiResponse<T> {
      data: T;
      status: number;
      error?: string;
    }
    
    const userResponse: ApiResponse<{ id: number; name: string }> = {
      data: { id: 1, name: 'Alice' },
      status: 200
    };
    \`\`\`
    
    Example (generic class):
    \`\`\`ts
    class Stack<T> {
      private items: T[] = [];
    
      push(item: T) {
        this.items.push(item);
      }
    
      pop(): T | undefined {
        return this.items.pop();
      }
    }
    
    const numberStack = new Stack<number>();
    numberStack.push(10);
    numberStack.push(20);
    console.log(numberStack.pop()); // 20
    \`\`\`
        `.trim()
    },
    {
      id: 13,
      question: `Angular (Intermediate): How does Angular’s Dependency Injection (DI) system work?`,
      answer: `
    Angular’s **Dependency Injection** (DI) is a design pattern that supplies a class (component, service, directive) with its dependencies rather than having the class create them itself. Key points:
    1. **Providers**: Define how to create a dependency (registering a service under \`@Injectable({ providedIn: 'root' })\` or in an \`NgModule\`/component’s \`providers\` array).
    2. **Injector Hierarchy**: 
       - **Root Injector** (\`providedIn: 'root'\`): Singleton for the entire application.
       - **Module Injector**: For each lazy-loaded NgModule.
       - **Component Injector**: If you provide a service in a component’s \`providers\`, that component and its children get a separate instance.
    3. **Injection Tokens**: Use \`@Inject\` or custom \`InjectionToken\` when you need to inject non-class values.
    4. **Constructor Injection**: Angular inspects the constructor parameters’ types or tokens and resolves dependencies automatically.
    
    Example:
    \`\`\`ts
    @Injectable({
      providedIn: 'root'
    })
    export class ApiService {
      constructor(private http: HttpClient) {}
    }
    
    @Component({
      selector: 'app-data',
      template: '<p>Data loaded</p>'
    })
    export class DataComponent {
      constructor(private api: ApiService) {
        this.api.getData().subscribe(...);
      }
    }
    \`\`\`
    
    Here, \`ApiService\` is provided in the root injector. When Angular creates \`DataComponent\`, it sees the constructor requires \`ApiService\` and fetches the singleton from the injector.
        `.trim()
    },
    {
      id: 14,
      question: `JavaScript (Advanced): Explain the event loop, call stack, and microtask queue in detail.`,
      answer: `
    JavaScript runtime uses a **call stack** and an **event loop** to manage execution. In the browser (or Node.js), there’s also a **task queue** (macrotasks) and a **microtask queue**.
    
    1. **Call Stack**: A last-in-first-out (LIFO) stack where function calls are pushed and popped. When a function is invoked, a new frame is pushed; when it returns, the frame is popped.
    
    2. **Event Loop**: Continuously checks the call stack and the task queues:
       - If the call stack is empty, it looks at the microtask queue and runs all microtasks (in FIFO order).
       - After microtasks are drained, it picks the next task (macrotask) from the task queue and pushes it to the call stack.
       - **Macrotask examples**: \`setTimeout\`, \`setInterval\`, DOM events, I/O callbacks.
       - **Microtask examples**: Promises (\`.then/catch/finally\`), \`queueMicrotask\`, \`MutationObserver\`.
    
    3. **Execution Order**:
       - Synchronous code runs first (pushed onto the call stack).
       - When a promise resolves, its \`.then\` callback is placed into the microtask queue.
       - Once the current call stack completes, the event loop processes the microtask queue entirely before handling the next macrotask.
    
    Example:
    \`\`\`js
    console.log('Start');
    
    setTimeout(() => {
      console.log('setTimeout callback');
    }, 0);
    
    Promise.resolve().then(() => {
      console.log('Promise.then callback');
    });
    
    console.log('End');
    \`\`\`
    
    **Expected output**:
    \`\`\`
    Start
    End
    Promise.then callback
    setTimeout callback
    \`\`\`
    Explanation:
    - \`Start\` and \`End\` are logged synchronously.
    - The resolved promise’s \`.then\` is queued as a microtask.
    - \`setTimeout\` callback is queued as a macrotask.
    - After the call stack is empty, the microtask (\`Promise.then callback\`) runs before the macrotask (\`setTimeout callback\`).
        `.trim()
    },
    {
      id: 15,
      question: `TypeScript (Advanced): Explain decorators, their use cases, and how you’d implement a class/method decorator.`,
      answer: `
    **Decorators** are a TypeScript feature (stage 2 ECMAScript proposal) that allow you to attach metadata or modify classes, methods, properties, or parameters at design time. Angular uses decorators extensively (\`@Component\`, \`@Injectable\`, \`@NgModule\`, etc.).
    
    1. **Class Decorator**: A function that takes a constructor and can return a new constructor or modify the existing one.
    2. **Method Decorator**: A function that receives the target prototype, method name, and descriptor; can wrap/modify method behavior.
    3. **Property Decorator**: Receives the target object and property key; can define metadata or alter property getters/setters.
    4. **Parameter Decorator**: Receives the target, method name, and parameter index; often used for dependency injection metadata.
    
    Example (class decorator):
    \`\`\`ts
    function Sealed(constructor: Function) {
      Object.seal(constructor);
      Object.seal(constructor.prototype);
    }
    
    @Sealed
    class MyClass {
      name = 'Test';
    }
    \`\`\`
    Here, applying \`@Sealed\` seals the class and its prototype so no new properties can be added.
    
    Example (method decorator):
    \`\`\`ts
    function Log(
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        console.log(\`Calling \${propertyKey} with args:\`, args);
        const result = originalMethod.apply(this, args);
        console.log(\`\${propertyKey} returned:\`, result);
        return result;
      };
      return descriptor;
    }
    
    class Calculator {
      @Log
      add(a: number, b: number) {
        return a + b;
      }
    }
    
    const calc = new Calculator();
    calc.add(2, 3);
    // Logs:
    // Calling add with args: [2, 3]
    // add returned: 5
    \`\`\`
        `.trim()
    },
    {
      id: 16,
      question: `Angular (Advanced): Compare AOT vs JIT compilation and explain how Ivy’s tree-shaking differs from View Engine’s approach.`,
      answer: `
    1. **JIT (Just-In-Time) Compilation**:
       - Happens in the browser at runtime.
       - Angular takes the templates (component HTML and CSS) and compiles them into JavaScript code when the app loads.
       - Advantages:
         - Faster incremental builds in development ('ng serve' recompiles quickly).
         - Templates are compiled during runtime, useful for quick experimentation.
       - Disadvantages:
         - Larger bundle size (includes the compiler).
         - Slower initial load (compilation cost in the browser).
    
    2. **AOT (Ahead-Of-Time) Compilation**:
       - Happens at build time.
       - Angular’s compiler runs on your machine (CI or dev machine), compiles templates into optimized JavaScript, and produces a leaner bundle.
       - Advantages:
         - Smaller bundle (no compiler included).
         - Faster startup (templates already compiled).
         - Template errors caught during build rather than runtime.
       - Disadvantages:
         - Longer build time (compilation happens on each build).
    
    3. **Ivy vs View Engine Tree-Shaking**:
       - **View Engine**: Used static analysis to detect metadata (from \`@Component\`, \`@NgModule\`, etc.) and then relied on Uglify/Terser to remove unreachable code. However, because of the way factories and metadata were generated, many unused components/modules might still end up in the bundle.
       - **Ivy**: Generates highly granular, per-component instructions. Each component, directive, and service has its own “factory” function that is referenced only where needed.  
         - **Tree-shaking** in Ivy is more effective because:
           1. Unused component metadata is not pulled into the bundle.
           2. Ivy’s compiled output is less boilerplate—only the minimal runtime instructions remain.
           3. Angular CLI can drop unused providers, directives, and pipes more reliably.
    
    Example (build flags):
    \`\`\`bash
    # JIT build (default for dev)
    ng build
    
    # AOT build (commonly used for production)
    ng build --prod --aot
    \`\`\`
    
    In Angular 16+, Ivy is the default compiler. It further optimizes by generating “partial” Ivy code for libraries, enabling them to be tree-shaken even when published as pre-compiled packages.
    
        `.trim()
    },
    {
      id: 17,
      question: `JavaScript (Advanced): What is the difference between debounce and throttle? Provide use cases.`,
      answer: `
      - **Debounce**: Ensures that a function is only called after a specified “quiet” period has passed since the last invocation. If the user keeps triggering the event (e.g., typing in a search box), the debounce timer resets each time. Only after the user stops triggering for the defined delay will the function run.
      
        **Example (debounce)**:
        \`\`\`js
        function debounce(fn, delay) {
          let timer;
          return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
          };
        }
      
        const onSearch = (query) => console.log('Search for:', query);
        const debouncedSearch = debounce(onSearch, 300);
      
        // If user types rapidly:
        inputElement.addEventListener('input', (e) => {
          debouncedSearch(e.target.value);
        });
        \`\`\`
      
        **Use case**: Live search boxes, window resizing handlers—only run after the user has finished typing or resizing.
      
      - **Throttle**: Ensures that a function is only called at most once in a specified time window. If the user triggers the event repeatedly, the function runs immediately on the first trigger, then ignores subsequent triggers until the delay has passed.
      
        **Example (throttle)**:
        \`\`\`js
        function throttle(fn, limit) {
          let lastCall = 0;
          return function (...args) {
            const now = Date.now();
            if (now - lastCall >= limit) {
              lastCall = now;
              fn.apply(this, args);
            }
          };
        }
      
        const onScroll = () => console.log('Scroll event');
        const throttledScroll = throttle(onScroll, 200);
      
        window.addEventListener('scroll', throttledScroll);
        \`\`\`
      
        **Use case**: Scroll events, mousemove events—limit how often a handler runs to improve performance.
          `.trim()
    },
    {
      id: 18,
      question: `TypeScript (Advanced): What are mapped types? Give an example of creating a Partial type manually.`,
      answer: `
      **Mapped Types** allow you to create new types by transforming each property in an existing type. You iterate over the keys of a type using \`[K in keyof T]\`.
      
      - **Built-in example**: \`Partial<T>\`, which makes all properties optional.
        \`\`\`ts
        // Built-in TypeScript definition for Partial:
        type Partial<T> = {
          [K in keyof T]?: T[K];
        };
        \`\`\`
      
      - **Manual example**: Suppose we have an interface:
        \`\`\`ts
        interface User {
          id: number;
          name: string;
          isActive: boolean;
        }
        \`\`\`
      
        We can create a mapped type that makes all properties nullable:
        \`\`\`ts
        type NullableUser = {
          [K in keyof User]: User[K] | null;
        };
      
        // Equivalent to:
        // type NullableUser = {
        //   id: number | null;
        //   name: string | null;
        //   isActive: boolean | null;
        // };
        \`\`\`
      
      - **Creating a Readonly type manually**:
        \`\`\`ts
        type MyReadonly<T> = {
          readonly [K in keyof T]: T[K];
        };
      
        // Usage
        const user: MyReadonly<User> = { id: 1, name: 'Alice', isActive: true };
        // user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
        \`\`\`
      
      **Use cases**: Building utility types (Partial, Required, Readonly, Pick, Record) and enforcing consistent transformations across all properties of a type.
          `.trim()
    },
    {
      id: 19,
      question: `Angular (Intermediate): What is the difference between Subject, BehaviorSubject, and ReplaySubject in RxJS? Provide code examples for each.`,
      answer: `
      - **Subject**: A multicast Observable. New subscribers only receive values emitted after they subscribe. Does not hold a current value.
        \`\`\`ts
        import { Subject } from 'rxjs';
      
        const subj = new Subject<number>();
      
        subj.subscribe((v) => console.log('Subscriber A:', v));
        subj.next(1); // Subscriber A: 1
      
        subj.subscribe((v) => console.log('Subscriber B:', v));
        subj.next(2);
        // Subscriber A: 2
        // Subscriber B: 2
        \`\`\`
      
      - **BehaviorSubject**: Requires an initial value. It holds the current value and emits it immediately to new subscribers, then continues with subsequent values.
        \`\`\`ts
        import { BehaviorSubject } from 'rxjs';
      
        const behavior = new BehaviorSubject<string>('initial');
      
        behavior.subscribe((v) => console.log('Subscriber A:', v));
      // Subscriber A: initial
      
        behavior.next('first update');
      // Subscriber A: first update
      
        behavior.subscribe((v) => console.log('Subscriber B:', v));
      // Subscriber B: first update
      
        behavior.next('second update');
      // Subscriber A: second update
      // Subscriber B: second update
        \`\`\`
      
      - **ReplaySubject**: Buffers a specified number of past values (or within a time window) and replays them to new subscribers before emitting new values.
        \`\`\`ts
        import { ReplaySubject } from 'rxjs';
      
        // Buffer size 2: keeps last 2 values
        const replay = new ReplaySubject<number>(2);
      
        replay.next(10);
        replay.next(20);
        replay.next(30);
      
        replay.subscribe((v) => console.log('Subscriber A:', v));
      // Subscriber A: 20
      // Subscriber A: 30
      
        replay.next(40);
      // Subscriber A: 40
      
        replay.subscribe((v) => console.log('Subscriber B:', v));
      // Subscriber B: 30
      // Subscriber B: 40
        \`\`\`
      
      **Use cases**:
      - Use **Subject** when you just need an event bus—subscribers only care about future events.
      - Use **BehaviorSubject** when you need to keep the latest value (e.g., application state store, current user).
      - Use **ReplaySubject** when you want to replay a fixed number of past events to subscribers (e.g., chat history).
          `.trim()
    },


  ]
}
