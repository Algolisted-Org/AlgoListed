<!-- 
  "date" : "August 18, 2023",
  "title" : "OOPS interview questions",
  "desc" : "Numerous websites cover common OOPS questions; however, some of these questions are overly familiar and may not suffice for unique interview scenarios. This blog provides questions, the corresponding company where they were asked, and concise answers to aid your memorization.",
  "category" : "Core Subjects",
  "author" : ["Atanu Nayak"],
  "authorLink" : ["https://www.linkedin.com/in/atanu-nayak-profile/"],
  "authorImageLink" : ["https://avatars.githubusercontent.com/u/93304796?v=4"],
  "tags" : ["OOPS", "Core Subjects", "CS Fundamental", "Interview"],
  "url" : "OOPS-interview-questions",
  "titleSupport" : "OOPS Interview Questions"
 -->

![image](https://github.com/Nayaker/AlgoListed/assets/93304796/279a280a-4de6-4dea-b324-0e9b0b70d3fb)

Numerous websites cover common OOPS questions; however, some of these questions are overly familiar and may not suffice for unique interview scenarios. This blog provides questions, the corresponding company where they were asked, and concise answers to aid your memorization.

<b class="question"></b>
<div class="answer"></div>

<b class="question">List and explain all types of Inheritance.</b>
<div class="answer">
    - Single Inheritance: A class inherits from only one base class. </br>
    - Multiple Inheritance: A class inherits from more than one base class. </br>
    - Multilevel Inheritance: Inheritance forms a chain where a derived class inherits from a base class, and another class inherits from this derived class. </br>
    - Hierarchical Inheritance: Multiple classes inherit from a single base class. </br>
    - Hybrid Inheritance: A combination of multiple and hierarchical inheritance. </br>
</div>

</br></br>
<b class="question">
  What is Diamond problem, and how do we solve it. Write code for it.
</b>

<div class="answer">
  
  The "Diamond Problem" is a challenge that arises in multiple inheritance scenarios when a class inherits from two classes that share a common base class. This can lead to ambiguity in accessing members and result in unexpected behavior.
  To solve the Diamond Problem, you can use "Virtual Inheritance." This involves declaring the common base class as a virtual base class in the derived classes to ensure that there's only one instance of the base class shared among the derived classes.
 
  ```
  class Animal {
  public:
      void speak() {
          cout << "Animal speaks" << endl;
      }
  };
  
  class Mammal : public virtual Animal { // Virtual inheritance
  };
  
  class Bird : public virtual Animal { // Virtual inheritance
  };
  
  class Bat : public Mammal, public Bird { // Multiple inheritance
  };
  ```

</div>

</br></br>
<b class="question">
  what is a copy constructor and what will happen if the constructor is private.
</b>
<div class="answer">
A copy constructor is a special constructor in C++ that creates a new object by copying the values from an existing object. It's used to initialize a new object with the same values as an existing object of the same class. </br>
If a class's copy constructor is made private, it prevents instances of that class from being copied using the copy constructor. This effectively restricts the use of the copy constructor outside of the class, making it inaccessible for creating copies of objects. This is often used to enforce certain behavior or prevent unintended object copying.
</div>

</br></br>
<b class="question">
  What is the difference between function overloading and function overriding? 
</b>
<div class="answer">
Function overloading involves defining multiple functions with the same name in a class, but with different parameters. Function overriding occurs when a derived class provides a specific implementation for a function already defined in its base class, enabling polymorphic behavior.
</div>

</br></br>
<b class="question">
  What is difference between c++, java and python in terms of OOPS.
</b>
<div class="answer">
  <p>
    C++:
    C++ is a statically typed language with strong emphasis on performance and memory control.
    It supports both compile-time polymorphism (function overloading, operator overloading) and runtime polymorphism (virtual functions, function overriding).
    It allows multiple inheritance and provides finer control over memory management with features like pointers.
  </p>
  <p>
    Java:
    Java is a statically typed language known for its platform independence through the Java Virtual Machine (JVM).
    It supports runtime polymorphism through the use of interfaces and method overriding.
    Java doesn't support multiple inheritance directly but allows multiple interface implementation, enabling a form of multiple inheritance.
  </p>
  <p>
    Python:
    Python is dynamically typed and emphasizes code readability and simplicity.
    It supports runtime polymorphism using method overriding.
    Python is one of the few modern programming languages that support multiple inheritance.
    Python does not have explicit access modifiers like some other languages; instead, it uses naming conventions to indicate the visibility of attributes and methods.
  </p>
</div>

</br></br>
<b class="question">
  What is the difference between function overloading and function overriding? 
</b>
<div class="answer">
Function overloading involves defining multiple functions with the same name in a class, but with different parameters. Function overriding occurs when a derived class provides a specific implementation for a function already defined in its base class, enabling polymorphic behavior.
</div>


