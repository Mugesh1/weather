import { AfterViewChecked, Component, OnInit } from '@angular/core';

interface QAItem {
  id: number;
  question: string;
  answer?: string;
  expanded?: boolean;
  category: 'JavaScript' | 'Angular' | 'TypeScript' | 'HTML/CSS';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface DifficultyGroup {
  difficulty: 'Intermediate' | 'Advanced';
  items: QAItem[];
}

interface CategoryGroup {
  category: 'JavaScript' | 'Angular' | 'TypeScript' | 'HTML/CSS';
  groups: DifficultyGroup[];
}
declare var Prism: any;

@Component({
  selector: 'app-grill-zone',
  templateUrl: './grill-zone.component.html',
  styleUrls: ['./grill-zone.component.scss']
})

export class GrillZoneComponent implements OnInit, AfterViewChecked {
  selectedCategory: 'JavaScript' | 'Angular' | 'TypeScript' | 'HTML/CSS';
  selectedDifficulty: 'Intermediate' | 'Advanced';
  categorizedList: CategoryGroup[] = [];
  private flatList: QAItem[] = [
    {
      id: 1,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'Differentiate let vs var vs const ?',
      answer: `
- **var**: Function-scoped (or global-scoped if outside a function). Can be re-assigned and re-declared. Hoisted (initialized as undefined).
- **let**: Block-scoped. Can be re-assigned but not re-declared in the same scope. Hoisted but not initialized (temporal dead zone until declaration).
- **const**: Block-scoped. Cannot be re-assigned or re-declared. Must be initialized at declaration. Also hoisted but in a temporal dead zone until declaration.
      `.trim()
    },
    {
      id: 2,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'what is NgModule Decorator ?',
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
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'Can we have multiple NgModule ?',
      answer: `
- Yes, an Angular application is built from many \`@NgModule\` classes. Each feature or lazy-loaded area is its own NgModule.
      `.trim()
    },
    {
      id: 4,
      category: 'Angular',
      difficulty: 'Advanced',
      question: 'Differentiate Lazy Loading vs Eager Loading vs Preload loading ?',
      answer: `
- **Eager Loading**: Imports all feature modules up front. Every module is bundled and downloaded when the app starts.
- **Lazy Loading**: Defers loading of a feature module until the user navigates to a route that requires it. Reduces initial bundle size.
- **Preload Loading**: A hybrid approach—lazy modules are automatically fetched in the background once the main app loads, so they’re ready when needed, but not part of the initial bundle.
      `.trim()
    },
    {
      id: 5,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'Differentiate navigateByUrl vs navigate ?',
      answer: `
- \`router.navigateByUrl('/path')\`: You pass a URL string directly.
- \`router.navigate(['/path', param1, param2])\`: You pass an array of path segments (and optional parameters). Angular builds the URL for you.
      `.trim()
    },
    {
      id: 6,
      category: 'Angular',
      difficulty: 'Advanced',
      question: 'Observables: Cold vs. Hot?',
      answer: `
    - **Cold Observable**: Starts emitting values only when someone subscribes. Each subscriber gets its own independent execution.
      Example: HTTP requests.
    - **Hot Observable**: Emits values even without subscribers. All subscribers share the same execution.
      Example: Mouse events or WebSocket streams.
    - Think: Cold = unicast, Hot = multicast.
      `.trim()
    },
    {
      id: 7,
      category: 'Angular',
      difficulty: 'Advanced',
      question: 'Explain share and replay operators, and the role of Scheduler?',
      answer: `
    - **share()**: Multicasts the source Observable. All subscribers share the same execution. Avoids re-execution of side-effects.
    - **shareReplay(n)**: Same as share but also replays the last 'n' emissions to new subscribers.
    - **Scheduler**: Controls when a subscription starts and how notifications are delivered (e.g., async, queue, animationFrame). It’s a mechanism in RxJS to control timing.
      `.trim()
    },
    {
      id: 8,
      category: 'Angular',
      difficulty: 'Advanced',
      question: 'In Angular, do we need to unsubscribe from every Observable?',
      answer: `
    - **Not always**. You only need to unsubscribe manually when:
      - The Observable is infinite (e.g., interval, subject).
      - It doesn’t complete on its own.
    - **Don’t need to unsubscribe** if:
      - You're using 'HttpClient' (completes after one emission).
      - The Observable is tied to Angular lifecycle (e.g., async pipe, 'takeUntil', 'take(1)').
      `.trim()
    },
    {
      id: 9,
      category: 'Angular',
      difficulty: 'Advanced',
      question: 'Angular HTTPClient: Benefits over fetch and XMLHttpRequest?',
      answer: `
    - Built-in support for **observables** (stream-based).
    - Handles **request/response transformation**, like JSON parsing.
    - Easy to apply **interceptors**, **retry**, and **error handling**.
    - Built-in with Angular DI and lifecycle integration.
    - Provides a clean and declarative API vs. fetch’s imperative style.
      `.trim()
    },
    {
      id: 10,
      category: 'Angular',
      difficulty: 'Advanced',
      question: 'Multiple Interceptors: How do they work?',
      answer: `
    - Angular supports **multiple interceptors**.
    - They work in a **chain-like fashion** (like middleware).
      - Request goes through interceptors in the order they are **provided**.
      - Response is processed in the **reverse order**.
    - Useful for separating concerns like auth, logging, and error handling.
      `.trim()
    },
    {
      id: 11,
      category: 'Angular',
      difficulty: 'Advanced',
      question: 'What techniques are used to optimize performance in Angular?',
      answer: `
    - **Change Detection Strategies** (e.g., OnPush).
    - **Lazy Loading Modules**.
    - **TrackBy** with *ngFor.
    - **Memoization** and **Pure Pipes**.
    - **Detach zones** where possible ('NgZone').
    - **Preloading Strategy** for background loading.
    - **Tree Shaking** & **AOT Compilation**.
    - Use of **Standalone Components** (from Angular v14+).
      `.trim()
    },
    {
      id: 12,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'Why do we use * in structural directives like *ngIf or *ngFor?',
      answer: `- The \`*\` is shorthand for Angular's **template syntax**.
    - It tells Angular: "Transform this into an embedded template".
    - Example: \`*ngIf="show"\` becomes: \`<ng-template [ngIf]="show">...</ng-template>\`
    - It's mainly used with **structural directives** that change the DOM layout (e.g., \`*ngIf\`, \`*ngFor\`, \`*ngSwitch\`).
    - You can also write without \`*\` using the long-form \`<ng-template>\` if needed.`
        .trim()
    },
    {
      id: 13,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'Why do Angular docs sometimes refer to components as directives?',
      answer: `- Technically, an Angular **component is a special type of directive** that has a **template**.
    - All components are directives, but not all directives are components.
    - **Component** = Directive + View (template).
    - **Directive** = No template, just behavior.
    - That's why you'll see Angular documentation sometimes say: "Components are directives with templates."
    - Example: \`@Component({ ... })\` is built on top of \`@Directive()\`.`
        .trim()
    },    
    {
      id: 14,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'Constructor? Why avoid business logic in constructor?',
      answer: `
    - A **constructor** is a special method used to initialize a class's instance when it is created.
    - It is meant for **setting up basic object state**, like initializing properties or injecting dependencies.
    - **Avoid putting business logic** (e.g., API calls, complex computations, side-effects) in constructors because:
      - It makes the class **harder to test** and maintain.
      - Constructors should be **fast and predictable** — heavy logic can cause performance issues or errors during instantiation.
      - It breaks the **Single Responsibility Principle** — constructors should only construct.
      - In frameworks like Angular, lifecycle methods like \`ngOnInit()\` are the right place for such logic.
    - Example:
    \`\`\`js
    constructor(private http: HttpClient) {
      // Avoid: making API calls here
    }
    ngOnInit() {
      // Do business logic like API calls here
      this.http.get('/api/data').subscribe(...);
    }
    \`\`\`
      `.trim()
    },
    {
      id: 15,
      category: 'Angular',
      difficulty: 'Advanced',
      question: 'What is NgZone, Change Detection Strategy, and detectChanges() in Angular?',
      answer: `
    - **NgZone**:  
      - Angular service to detect **when to trigger change detection**.  
      - Monkey-patches async operations (setTimeout, promises) to auto-run change detection.  
      - Helps optimize performance by running code *outside Angular's zone* to avoid unnecessary checks.  
    
    - **Change Detection Strategy**:  
      - Two types:  
        - \`Default\`: checks component and all children on every CD cycle.  
        - \`OnPush\`: checks only when @Input() reference changes, events originate, or manually triggered.  
      - \`OnPush\` boosts performance by reducing checks.  
    
    - **detectChanges()**:  
      - Method from \`ChangeDetectorRef\` to manually trigger change detection.  
      - Useful for changes made outside Angular’s zone (e.g., 3rd-party libs).  
    
    - Example:  
    \`\`\`ts
    constructor(private cd: ChangeDetectorRef, private zone: NgZone) {}
    ngOnInit() {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.data = 'updated';
          this.zone.run(() => this.cd.detectChanges());
        }, 1000);
      });
    }
    \`\`\`
    `.trim()
    },
    {
      id: 16,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'What is the difference between Pure and Impure Pipes in Angular?',
      answer: `- **Pipes** transform data in templates like \`date\` or \`uppercase\`.
    - **Pure Pipe** (default):
      - Runs only when input changes by reference or primitive value changes.
      - Better performance, assumes immutability.
      - Example:
    \`\`\`ts
    @Pipe({ name: 'myPipe' }) // pure: true by default
    export class MyPipe implements PipeTransform {
      transform(value: any): any { ... }
    }
    \`\`\`
    - **Impure Pipe**:
      - Runs every change detection cycle, regardless of input changes.
      - Use for mutable or external data (e.g., current time).
      - Performance cost.
      - Must set \`pure: false\`:
    \`\`\`ts
    @Pipe({ name: 'myImpurePipe', pure: false })
    export class MyImpurePipe implements PipeTransform {
      transform(value: any): any { ... }
    }
    \`\`\`
    - **When to use?**
      - Pure: static or immutable data.
      - Impure: only if needed for dynamic data.
    - ⚠️ Impure pipes can degrade performance in large templates.`.trim()
    },
    {
      id: 17,
      category: 'HTML/CSS',
      difficulty: 'Intermediate',
      question: 'What is the difference between Flexbox and Grid in CSS?',
      answer: `- Both **Flexbox** and **Grid** are layout systems in CSS, but they serve different purposes:
    - **Flexbox (Flexible Box Layout)**:
      - One-dimensional layout system: works in **a single direction** — row or column.
      - Best for laying out items **in a line** or along **one axis**.
      - Automatically adjusts item sizes and spacing.
      - Great for components like nav bars, buttons in a row, etc.
      - Example:
      \`\`\`css
      display: flex;
      flex-direction: row; /* or column */
      justify-content: space-between;
      align-items: center;
      \`\`\`
    - **Grid (CSS Grid Layout)**:
      - Two-dimensional layout system: works in **both rows and columns**.
      - Ideal for complex page layouts — think of it as a **table without markup**.
      - Allows precise placement of items using grid lines, areas, and spans.
      - Example:
      \`\`\`css
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-template-rows: auto;
      gap: 10px;
      \`\`\`
    - **Flex vs Grid — When to Use What?**
      - Use **Flexbox** for simpler, linear layouts (like toolbars or cards in a row).
      - Use **Grid** for full-page layouts or anything with rows **and** columns.
    - Tip:
      - You can combine them! Use Grid for page layout, and Flexbox for layout **inside** each grid item.
    `.trim()
    },    
    {
      id: 18,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'What are @HostBinding and @HostListener in Angular?',
      answer: `- Both **@HostBinding** and **@HostListener** are decorators used to interact with the **host element** of a directive or component.
    - **@HostBinding**:
      - Binds a property or attribute of the host element to a value in the directive/component.
      - Useful for dynamically setting **classes**, **styles**, **attributes**, etc.
      - Example:
    \`\`\`ts
    @Directive({ selector: '[myHighlight]' })
    export class HighlightDirective {
      @HostBinding('style.backgroundColor') bg = 'yellow';
    }
    \`\`\`
      - This sets the background color of the host element to yellow.
    - **@HostListener**:
      - Listens to **DOM events** on the host element and calls a method in response.
      - Useful for adding event listeners like click, mouseover, etc.
      - Example:
    \`\`\`ts
    @Directive({ selector: '[myHighlight]' })
    export class HighlightDirective {
      @HostBinding('style.backgroundColor') bg = 'transparent';
      @HostListener('mouseenter') onMouseEnter() {
        this.bg = 'lightblue';
      }
      @HostListener('mouseleave') onMouseLeave() {
        this.bg = 'transparent';
      }
    }
    \`\`\`
      - This changes the background color when the mouse enters/leaves the element.
    - Summary:
      - \`@HostBinding\` → Binds properties **to the host element**.
      - \`@HostListener\` → Listens to **events from the host element**.
    - Common use cases:
      - Creating custom directives (e.g., hover effects, interactive UI).
    `.trim()
    },
    {
      id: 19,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What is a Closure in JavaScript?',
      answer: `
    - A **closure** is created when a function **remembers** the variables from its **lexical scope**, even after the outer function has finished executing.
    - It allows **data encapsulation** and is the base for many patterns (e.g., private variables, function factories).
    - Example:
    \`\`\`js
    function outer() {
      let count = 0;
      return function inner() {
        count++;
        console.log(count);
      };
    }
    const counter = outer();
    counter(); // 1
    counter(); // 2
    \`\`\`
    - Even though \`outer()\` has finished, \`inner()\` keeps access to \`count\` — that’s a **closure**.
    `.trim()
    },    
    {
      id: 20,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'What is the async pipe in Angular?',
      answer: `
        - The **async pipe** automatically subscribes to an **Observable** or **Promise** and returns the latest emitted value in the template.
        - It also **automatically unsubscribes** when the component is destroyed.
        - Prevents memory leaks and boilerplate subscription code.
        - Syntax:
          \`\`\`html
          <div *ngIf="data$ | async as data">
            {{ data.name }}
          </div>
          \`\`\`
        - Works well with \`HttpClient\`, \`NgRx store.select\`, and \`BehaviorSubject\`.
      `.trim()
    },
    {
      id: 21,
      category: 'Angular',
      difficulty: 'Advanced',
      question: 'What is NgRx in Angular?',
      answer: `- **NgRx** is a state management library for Angular, inspired by **Redux**.
    - Uses **RxJS** and a **unidirectional data flow** model.
    - Core concepts:
      - **Store**: Single source of truth (global state).
      - **Actions**: Describe *what happened* (e.g., LoadUser).
      - **Reducers**: Describe *how state changes* based on actions.
      - **Selectors**: Extract pieces of state.
      - **Effects**: Handle side effects like HTTP requests.
    - Benefits:
      - Predictable state.
      - DevTools for debugging.
      - Centralized logic and scalability.
    - Example:
    \`\`\`ts
    store.dispatch(loadUsers());
    store.select(selectAllUsers).subscribe(...);
    \`\`\`
    `.trim()
    },    
    {
      id: 22,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What are key ES6 features in JavaScript?',
      answer: `
    - ES6 (ECMAScript 2015) introduced many modern features. Key ones:
      - \`let\` and \`const\`: Block-scoped variables.
      - Arrow functions: \`() => {}\` syntax, lexical \`this\`.
      - Template literals: \`Hello, \${name}!\`
      - Destructuring: \`const {a, b} = obj;\`
      - Default parameters: \`function greet(name = 'Guest') {}\`
      - Spread/rest: \`...arr\`, \`function(...args)\`
      - Classes: \`class Person { constructor() {} }\`
      - Modules: \`import/export\`
      - Promises: Native async handling.
      - Map/Set: New data structures.
      - \`for...of\`: Iterating over iterables.
    `.trim()
    },
    {
      id: 24,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What is Object and Array Destructuring in JavaScript?',
      answer: `- **Destructuring** lets you extract values from arrays or properties from objects into distinct variables.
    - **Array Destructuring**:
    - Order matters (based on index).
    - Example:
    \`\`\`js
    const nums = [10, 20, 30];
    const [a, b] = nums;
    console.log(a); // 10
    console.log(b); // 20
    \`\`\`
    - You can skip values or use rest:
    \`\`\`js
    const [first, , third] = [1, 2, 3]; // skip 2
    const [x, ...others] = [5, 6, 7]; // others = [6, 7]
    \`\`\`
    - **Object Destructuring**:
    - Matches by **property name**, not order.
    - Example:
    \`\`\`js
    const user = { name: 'John', age: 25 };
    const { name, age } = user;
    console.log(name); // 'John'
    \`\`\`
    - Can rename or set default values:
    \`\`\`js
    const { name: username = 'Guest' } = {};
    console.log(username); // 'Guest'
    \`\`\`
    - 💡 Tip:
    - Destructuring is often used in **function parameters**, **React props**, or **config objects**.
    - Clean, concise, and makes code easier to read!`.trim()
    },    
    {
      id: 25,
      category: 'HTML/CSS',
      difficulty: 'Beginner',
      question: 'What is the CSS Box Model?',
      answer: `- The **CSS Box Model** describes how every HTML element is represented as a rectangular box composed of several layers.
    - Layers of the Box Model (from inside out):
      1. **Content**: The actual text or image inside the element.
      2. **Padding**: Space between content and border.
      3. **Border**: Surrounds the padding and content.
      4. **Margin**: Space outside the border — separates elements from others.
    - Formula:
    \`\`\`
    Total Width = content + padding (left+right) + border (left+right) + margin (left+right)
    Total Height = content + padding (top+bottom) + border (top+bottom) + margin (top+bottom)
    \`\`\`
    - Box-Sizing:
      - \`box-sizing: content-box\`: default, does not include padding/border in width.
      - \`box-sizing: border-box\`: includes padding and border in width/height → recommended.
    \`\`\`css
    * {
      box-sizing: border-box;
    }
    \`\`\`
    `.trim()
    },
    {
      id: 26,
      category: 'HTML/CSS',
      difficulty: 'Beginner',
      question: 'What are CSS pseudo-classes?',
      answer: `- **Pseudo-classes** let you apply styles to elements **based on their state or position**, without needing extra classes or JS.
    - Syntax:
    \`\`\`css
    selector:pseudo-class { styles }
    \`\`\`
    - Common pseudo-classes:
      - \`:hover\` → when mouse hovers
      - \`:active\` → when clicked
      - \`:focus\` → when element is focused
      - \`:nth-child(n)\` → target specific child index
      - \`:first-child\`, \`:last-child\`, \`:not(selector)\`
    - Example:
    \`\`\`css
    button:hover {
      background-color: blue;
    }
    li:nth-child(odd) {
      background: #f0f0f0;
    }
    \`\`\`
    - Tip:
      - Pseudo-classes enhance UX (e.g., highlighting, form validation) without JS.
    `.trim()
    },
    
    {
      id: 27,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'What is the difference between ng-template, ng-container, and ngTemplateOutlet in Angular?',
      answer: `- These three are Angular structural elements used to manage dynamic rendering and view control, but they serve different purposes.
    - **\`<ng-template>\`**:
      - Defines a **template block** that **does not render** by default.
      - Used to hold code for conditional rendering, reusable views, or structural directives.
      - Not part of the DOM until rendered explicitly.
      - Example:
    \`\`\`html
    <ng-template #loadingTemplate>
      <p>Loading...</p>
    </ng-template>
    \`\`\`
    - **\`<ng-container>\`**:
      - A **logical container** used to group elements *without adding extra DOM nodes*.
      - Useful with structural directives like \`*ngIf\` or \`*ngFor\`.
      - Does not render any wrapper in the final HTML.
      - Example:
    \`\`\`html
    <ng-container *ngIf="isLoggedIn">
      <p>Welcome!</p>
      <button>Logout</button>
    </ng-container>
    \`\`\`
    - **\`ngTemplateOutlet\`**:
      - A directive used to **render an ng-template** programmatically.
      - Lets you choose and inject templates dynamically.
      - Example:
    \`\`\`html
    <ng-template #errorTpl>
      <p>Error occurred</p>
    </ng-template>
    <ng-container *ngTemplateOutlet="errorTpl"></ng-container>
    \`\`\`
    - Summary:
      | Element           | Renders DOM? | Purpose                              |
      |-------------------|--------------|------------------------------------|
      | \`<ng-template>\`     | ❌           | Define hidden template blocks      |
      | \`<ng-container>\`    | ❌           | Group elements without extra tags  |
      | \`ngTemplateOutlet\` | N/A          | Render a selected \`<ng-template>\` |
    - Tip:
      - Use \`ng-template\` to define.
      - Use \`ng-container\` to structure logic.
      - Use \`ngTemplateOutlet\` to render dynamically.
    `.trim()
    },
    {
      id: 28,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'What is the difference between ViewChild and ContentChild in Angular?',
      answer: `- Both **@ViewChild** and **@ContentChild** are decorators used to access child elements/components, but they apply to different contexts.
    - **@ViewChild**:
      - Accesses elements **inside the component's own template**.
      - Use when you need to interact with child components, directives, or DOM inside the component.
      - Example:
    \`\`\`ts
    @ViewChild('myInput') inputEl!: ElementRef;
    \`\`\`
    \`\`\`html
    <input #myInput />
    \`\`\`
    - **@ContentChild**:
      - Accesses projected content passed **into the component** using \`<ng-content>\`.
      - Useful in reusable or wrapper components (like card, modal, etc.)
      - Example:
    \`\`\`ts
    @ContentChild('title') titleTpl!: TemplateRef<any>;
    \`\`\`
    \`\`\`html
    <app-wrapper>
      <h1 #title>Hello</h1>
    </app-wrapper>
    \`\`\`
    - Lifecycle Note:
      - \`@ViewChild\` is available in \`ngAfterViewInit()\`
      - \`@ContentChild\` is available in \`ngAfterContentInit()\`
    - Summary:
      | Decorator      | Accesses...                       | Available in...       |
      |---------------|---------------------------------|----------------------|
      | @ViewChild     | Template elements (own view)     | ngAfterViewInit      |
      | @ContentChild  | Projected content via ng-content | ngAfterContentInit   |
    `.trim()
    },    
    {
      id: 30,
      category: 'JavaScript',
      difficulty: 'Advanced',
      question: 'What is event delegation and why is it useful?',
      answer: `- **Event delegation** is a technique where a single event listener is added to a **parent element** instead of adding listeners to multiple child elements.
    - Events bubble up from the target element to its ancestors, so you can capture events on parent to handle all child interactions.
    - Benefits:
    - Improves performance by reducing the number of listeners.
    - Works for dynamically added elements.
    - Example:
    \`\`\`js
    document.getElementById('list').addEventListener('click', (event) => {
      if(event.target && event.target.matches('li.item')) {
        console.log('Clicked item:', event.target.textContent);
      }
    });
    \`\`\``.trim()
    },    
    {
      id: 31,
      category: 'JavaScript',
      difficulty: 'Advanced',
      question: 'What is a Promise and how does it work?',
      answer: `- A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.
    - It can be in one of three states:
      - **Pending**: initial state.
      - **Fulfilled**: operation completed successfully.
      - **Rejected**: operation failed.
    - Promises allow chaining with \`.then()\` and error handling with \`.catch()\`.
    - Example:
    \`\`\`js
    const p = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Done!'), 1000);
    });
    p.then(result => console.log(result))
     .catch(err => console.error(err));
    \`\`\``.trim()
    },
    {
      id: 32,
      category: 'JavaScript',
      difficulty: 'Advanced',
      question: 'What is the event loop in JavaScript?',
      answer: `
    - The **event loop** is a mechanism that allows JavaScript to perform **non-blocking asynchronous operations** despite being single-threaded.
    - It manages two main queues:
      - **Call Stack**: where functions get pushed and executed.
      - **Task Queue (Callback Queue)**: where asynchronous callbacks wait.
    - Process:
      1. JS runs tasks from the call stack.
      2. When stack is empty, it takes the first callback from the task queue.
    - This allows async code like \`setTimeout\`, \`Promises\`, and DOM events to work smoothly.
    `.trim()
    },
    {
      id: 33,
      category: 'JavaScript',
      difficulty: 'Advanced',
      question: 'What are generators and how are they different from regular functions?',
      answer: `
    - **Generators** are functions that can be **paused and resumed**.
    - Declared with \`function*\` syntax.
    - Use \`yield\` to pause and return intermediate values.
    - When called, they return an **iterator** object.
    - Useful for lazy evaluation, async flows, or handling infinite sequences.
    - Example:
    
    \`\`\`js
    function* gen() {
      yield 1;
      yield 2;
      return 3;
    }
    
    const g = gen();
    console.log(g.next()); // { value: 1, done: false }
    console.log(g.next()); // { value: 2, done: false }
    console.log(g.next()); // { value: 3, done: true }
    \`\`\`
    `.trim()
    },
    {
      id: 34,
      category: 'JavaScript',
      difficulty: 'Advanced',
      question: 'Explain the difference between call, apply, and bind methods.',
      answer: `
    - All three methods are used to set the \`this\` context for a function, but they differ in how arguments are passed:
    - \`call(thisArg, arg1, arg2, ...)\`: Invokes the function immediately. Arguments are passed individually.
    - \`apply(thisArg, [argsArray])\`: Invokes the function immediately. Arguments are passed as an array.
    - \`bind(thisArg, arg1, arg2, ...)\`: Returns a **new function** with \`this\` bound. Does not invoke immediately. Can be called later.
    - Example:
    \`\`\`js
    function greet(greeting, name) {
      console.log(greeting + ', ' + name);
    }
    greet.call(null, 'Hello', 'Alice');       // Hello, Alice
    greet.apply(null, ['Hi', 'Bob']);          // Hi, Bob
    const greetBob = greet.bind(null, 'Hey', 'Bob');
    greetBob();                                // Hey, Bob
    \`\`\`
    `.trim()
    },
    {
      id: 35,
      category: 'HTML/CSS',
      difficulty: 'Intermediate',
      question: 'What are @extend, @use, and @mixin in Sass and how are they used?',
      answer: `- **@extend**:
      - Lets one selector inherit the styles of another selector.
      - Avoids repeating styles and helps keep CSS DRY.
      - Works by combining selectors in the compiled CSS.
      - Example:
      \`\`\`scss
      .btn-primary {
        background: blue;
        color: white;
      }
      .btn-special {
        @extend .btn-primary;
        font-weight: bold;
      }
      \`\`\`
      - Drawback: can produce complex selectors if overused.
    - **@mixin**:
      - Defines a reusable block of styles or logic.
      - Can accept parameters for flexibility.
      - Include mixin styles with \`@include\`.
      - Example:
      \`\`\`scss
      @mixin flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .container {
        @include flex-center;
      }
      \`\`\`
    - **@use**:
      - Introduced in newer Sass versions for **module management**.
      - Imports another Sass file as a module.
      - Helps avoid naming conflicts by namespacing imports.
      - Example:
      \`\`\`scss
      // _variables.scss
      $primary-color: blue;
      // styles.scss
      @use 'variables';
      .header {
        color: variables.$primary-color;
      }
      \`\`\`
      - Preferred over \`@import\` in modern Sass workflows.
    - Summary:
      | Directive | Purpose                        | Key Use                         |
      |-----------|--------------------------------|---------------------------------|
      | @extend   | Inherit styles from another selector | Avoid repetition in selectors   |
      | @mixin    | Reusable style blocks with params | Write reusable, configurable styles |
      | @use      | Import Sass modules with namespace | Manage code modularly & safely  |
    `.trim()
    },    
    {
      id: 36,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'Should I use multiple *ngIf conditions or switch to [hidden] in Angular?',
      answer: `- **\`*ngIf\`**:
      - Adds/removes the element **from the DOM**.
      - Ideal when the content should not exist in the DOM when condition is false.
      - More performance-friendly for heavy or expensive components.
      - Example:
    \`\`\`html
    <div *ngIf="condition1">Show A</div>
    <div *ngIf="condition2">Show B</div>
    \`\`\`
    - **\`[hidden]\`**:
      - Keeps the element in the DOM but hides it using CSS (\`display: none\`).
      - Still occupies memory and runs lifecycle.
      - Useful when you need to toggle visibility frequently without re-creating DOM.
    - ⚖️ When to use what?
      - Use **\`*ngIf\`**:
        - When you want better performance by avoiding unnecessary DOM.
        - For **conditional rendering** of dynamic components.
      - Use **\`[hidden]\`**:
        - When toggling **visibility** without affecting layout or state.
        - When content is small and lifecycle should be preserved (e.g. input values).
    - ⚠️ Multiple \`*ngIf\` blocks are fine, but if they become **complex or nested**, consider:
      - Using \`ng-template\` or \`ngSwitch\`
      - Abstracting logic into a component or function.
    - Tip:
      - Don't over-optimize prematurely. Use \`*ngIf\` unless you have a reason to keep the element in the DOM.
    `.trim()
    },    
    {
      id: 37,
      category: 'Angular',
      difficulty: 'Intermediate',
      question: 'What is the difference between *ngIf and hidden? Which is better for performance?',
      answer: `
    - **\`*ngIf\`**: 
      - **Completely removes** the element and its children from the DOM when the condition is false.
      - DOM elements and Angular bindings are destroyed and re-created.
      - **Better for performance** when large or expensive components don't need to be kept in the DOM.
    
    - **\`[hidden]\` or \`hidden\` attribute**:
      - Hides the element with CSS (\`display: none\`), but **keeps it in the DOM**.
      - Angular bindings and change detection still run.
      - Useful when you need to **preserve the state** of a component (e.g., form values).
    
    ### 🔍 Performance Summary:
    - Use **\`*ngIf\`** when you want to **remove** elements completely and save performance.
    - Use **\`hidden\`** when you want to **preserve DOM state** but just hide it.
    
    ### Recommendation:
    - For performance optimization: prefer \`*ngIf\`.
    - For toggling visibility without destroying content: use \`[hidden]\`.
    `.trim()
    },
    {
      id: 38,
      category: 'HTML/CSS',
      difficulty: 'Intermediate',
      question: 'What is the use of double colon (::) in CSS?',
      answer: `- The **double colon (::)** defines **pseudo-elements** in CSS.
    - Introduced to differentiate pseudo-elements (::) from pseudo-classes (:).
    ### Pseudo-elements (::)
    Style specific parts of an element:
    - \`::before\` – content before element
    - \`::after\` – content after element
    - \`::first-line\` – styles first line of block
    - \`::selection\` – styles selected text
    Example:
    \`\`\`css
    p::first-line {
      font-weight: bold;
    }
    \`\`\`
    ### Pseudo-classes (:)
    Define special states:
    - \`:hover\`, \`:focus\`, \`:checked\`, etc.
    ### Summary:
    - Use \`::\` for **pseudo-elements** (structure).
    - Use \`:\` for **pseudo-classes** (state).
    `.trim()
    },    
    {
      id: 39,
      category: 'HTML/CSS',
      difficulty: 'Advanced',
      question: 'What is View Encapsulation in Angular and how does it affect CSS?',
      answer: `
    - Angular's **View Encapsulation** scopes component styles to the component only, preventing style leakage.
    
    ### Types:
    1. **Emulated (default)**: Angular adds unique attributes (e.g. \`_ngcontent-xxx\`) to emulate scoped styles.
    2. **None**: Styles are global, no scoping.
    3. **Shadow DOM**: Uses native Shadow DOM for full style encapsulation.
    
    ### Example:
    \`\`\`ts
    @Component({
      selector: 'my-comp',
      styleUrls: ['comp.scss'],
      encapsulation: ViewEncapsulation.Emulated
    })
    \`\`\`
    
    - **Interview Tip**: Understand differences between Emulated vs Shadow DOM regarding browser support, debugging, and style isolation.
    `.trim()
    },
    {
      id: 40,
      category: 'HTML/CSS',
      difficulty: 'Advanced',
      question: 'What are the best practices for optimizing HTML/CSS in Angular applications?',
      answer: `- Optimizing HTML/CSS in Angular helps improve performance and maintainability.  
    1. **Use OnPush Change Detection** - Reduces unnecessary change detection cycles in Angular.  
    2. **Minimize DOM Depth** - Avoid deeply nested elements for better render performance.  
    3. **Avoid Inline Styles** - Use SCSS or component styles for maintainability and reuse.  
    4. **Use Component-Level Encapsulation** - Prevent style leakage using Angular’s View Encapsulation.  
    5. **Avoid Complex CSS Selectors** - Simpler selectors apply faster and reduce parsing time.  
    6. **Use Lazy Loading for Modules** - Load styles and components only when needed.  
    7. **Bundle Styles Effectively** - Leverage Angular CLI’s \`styles[]\` array and modular SCSS organization.  
    - **Tip**: Keep styles modular, scoped, and clean to ensure long-term scalability.`.trim()
    }
    
    
    
    
    
  ];

  constructor() {
    const categories = Array.from(new Set(this.flatList.map(item => item.category))) as
      ('JavaScript' | 'Angular' | 'TypeScript' | 'HTML/CSS')[];
    this.categorizedList = categories.map(cat => {
      const itemsInCat = this.flatList.filter(i => i.category === cat);

      const difficulties = Array.from(
        new Set(itemsInCat.map(i => i.difficulty))
      ) as ('Intermediate' | 'Advanced')[];

      const groups: DifficultyGroup[] = difficulties.map(diff => ({
        difficulty: diff,
        items: itemsInCat.filter(i => i.difficulty === diff)
      }));
      return { category: cat, groups };
    });

    if (this.categorizedList.length > 0) {
      this.selectedCategory = this.categorizedList[0].category;
      this.selectedDifficulty = this.categorizedList[0].groups[0].difficulty;
    } else {
      this.selectedCategory = 'JavaScript';
      this.selectedDifficulty = 'Intermediate';
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewChecked() {
    Prism.highlightAll();
  }
  get selectedCategoryGroup(): CategoryGroup | undefined {
    return this.categorizedList.find(
      (cg) => cg.category === this.selectedCategory
    );
  }

  get selectedDifficultyGroup(): DifficultyGroup | undefined {
    return this.selectedCategoryGroup?.groups.find(
      (dg) => dg.difficulty === this.selectedDifficulty
    );
  }

  selectCategory(cat: 'JavaScript' | 'Angular' | 'TypeScript' | 'HTML/CSS') {
    this.selectedCategory = cat;

    const firstDifficulty = this.selectedCategoryGroup?.groups[0]?.difficulty;
    if (firstDifficulty) {
      this.selectedDifficulty = firstDifficulty;
    }
  }

  selectDifficulty(diff: 'Intermediate' | 'Advanced') {
    this.selectedDifficulty = diff;
  }

  toggle(item: QAItem) {
    item.expanded = !item.expanded;
  }
}
