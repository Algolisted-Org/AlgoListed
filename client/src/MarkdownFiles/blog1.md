<!-- 
  "date" : "August 18, 2023",
  "title" : "OOPS for Interview Revision",
  "desc" : "In this blog, I will elaborate on fundamental Object-Oriented Programming (OOP) concepts and provide illustrative code snippets to facilitate comprehension. Additionally, I have included a set of OOP-related questions aimed at assisting you in preparing for interviews.",
  "category" : "Core Subjects",
  "author" : ["Atanu Nayak"],
  "authorLink" : ["https://www.linkedin.com/in/atanu-nayak-profile/"],
  "authorImageLink" : ["https://avatars.githubusercontent.com/u/93304796?v=4"],
  "tags" : ["OOPS", "Core Subjects", "CS Fundamental", "Interview"],
  "url" : "OOPS-for-interview-revision",
  "titleSupport" : "OOPS for Interview Revision"
 -->

![image](https://github.com/Nayaker/AlgoListed/assets/93304796/265f4fca-fad4-4d4c-a635-6d85e0b2de88)

In this blog, I will elaborate on fundamental Object-Oriented Programming (OOP) concepts in C++ and provide illustrative code snippets to facilitate comprehension. Additionally, I have included a set of OOP-related questions aimed at assisting you in preparing for interviews.

<b> What will you learn : </b>
  - Class and Object
  - Constructor
  - 4 Pillars of OOPS
  - Encapsulation
  - Abstraction
  - Inheritance
  - PolyMorphism
  - Destructor
  - Deep copy and Shallow copy
  - Static Keyword
  - Virtual Keyword
  - Abstract Class
  - Friend Class
  - Base Class Pointer Derived Class Object
  - OOPS Interview Questions (Next Blog)
  

<b> Prerequisites : </b> All you need is a basic understanding of OOP concepts at the college studies level. While I intend to develop this blog starting from the fundamental concepts, I suggest considering a brief YouTube video for a more enhanced understanding.

## 1. Class and Object 
Object-Oriented Programming (OOP) is a programming paradigm that organizes code around objects, combining data and methods that operate on that data. A class in OOP is a blueprint defining the structure and behavior of objects. Objects are instances of classes, representing real-world entities and enabling encapsulation, abstraction, inheritance, and polymorphism.

```
class Mobile {
public: 
    int battery = 100;
    
    int battery_percentage(){
        return battery;
    }
};

Mobile *my_mobile1 = new Mobile(); // Dynamic Allocation
Mobile my_mobile2; // Static Allocation 
```

## 2. Constructor
Constructors serve as special class members that the compiler invokes each time an instance of that class is created. They share the same name as the class itself and can be defined either within or outside the class declaration.

There exist three varieties of constructors:
- Default constructors : This type requires no arguments and is invoked without parameters.
- Parameterized constructors : This version is invoked with a predetermined count of arguments.
- Copy constructors : A copy constructor is a class function that initializes an object using another instance of the same class.

```
class Mobile {
public: 
    int battery = 100;

    Mobile(){ // constructor 
        battery = 90;
    }
    
    int battery_percentage(){
        return battery;
    }
};
```

<b> Characteristics of the constructor: </b>
1. Constructor has same name as the class itself.
2. Constructors don’t have return type.
3. A constructor is automatically called when an object is created.
4. It must be placed in public section of class.
5. If we do not specify a constructor, C++ compiler generates a default constructor for object (expects
   no parameters and has an empty body).
6. Constructors can be overloaded.
7. Constructor can not be declared virtual.

## 3. The 4-Pillars of OOPS
The four pillars of Object-Oriented Programming (OOP) are encapsulation (data hiding), abstraction (modeling complexity), inheritance (reuse and extension), and polymorphism (varying behavior based on context).
<img className="small-img" src="https://github.com/Nayaker/AlgoListed/assets/93304796/ccccf644-4dcb-4cb2-a6f5-39d1ed511553"/>

<b> Real life examples for the 4 pillars of OOPS : </b>
  - Encapsulation : If you consider phone battery features you are able to see the battery but can not change the percentage. 
  - Abstraction : The user interacts with high-level functionalities like making calls, sending messages, and using apps without needing to understand the intricate details of the device's operating system or hardware architecture.
  - Inheritance : Features like touchscreen functionality, app support, and connectivity are common to all smartphones, while specific models or brands may have additional unique features.
  - Polymorphism : Consider various smartphone apps that offer multimedia playback (audio and video). Regardless of the media type (audio or video), a single "play" button on the screen initiates playback. Different media players exhibit polymorphism; each player's "play" functionality behaves differently based on the specific media it's designed to handle.

## 4. Encapsulation
Focuses on bundling the data (attributes) and methods (functions) that operate on that data into a single unit called a class. Emphasizes data protection and controlled access by declaring attributes as private and providing public methods (getters, setters) to interact with the data. Aims to ensure data integrity, prevent unintended modifications, and enhance security by controlling how data is accessed and modified.

```
class Mobile {
private :
    int battery = 100;
public: 
    int battery_percentage(){
        return battery;
    }
};
```

In the provided code, encapsulation is demonstrated by the use of private data members, like battery, which cannot be directly accessed or modified from outside the class. Instead, access is controlled through public methods like battery_percentage(), preserving data integrity and enhancing code maintainability.

## 5. Abstraction 
Focuses on simplifying complex reality by modeling classes based on their essential properties and behaviors, while hiding unnecessary details. Provides a clear and understandable interface for interacting with objects, abstracting away complex implementation details. Aims to create a high-level view of objects that users or other parts of the program can interact with, without needing to know the intricate internal workings.
```
class Mobile {
private :
    int battery = 100;
    void startBatteryDrain(int value) {
        while (battery > 0) {
            cout << "Battery Percentage : " << battery << endl;
            battery -= 1;
            this_thread::sleep_for(chrono::milliseconds(value));
        }
    }

public: 
    Mobile(){
        battery = 100;
        startBatteryDrain(20);
    }
};
```
In the given code, the function startBatteryDrain() facilitates battery depletion. However, users are shielded from the underlying process of battery drainage, exemplifying the principle of abstraction.

## 6. Inheritance
Inheritance facilitates the notion of "Code Reusability." It provides a mechanism through which a class can inherit the characteristics (data members and member functions) of another class.
```
class Samsung_Mobile : public Mobile {
    // Class definition for Samsung_Mobile inheriting from Mobile
};
```

<b> There are 5 Types of Inheritance in C++ : </b> 
1. Single Inheritance.
2. Multiple Inheritance.
3. Multilevel Inheritance.
4. Hierarchical Inheritance.
5. Hybrid Inheritance.

<img width="982" alt="Screenshot 2023-08-18 at 2 04 39 PM" src="https://github.com/Nayaker/AlgoListed/assets/93304796/44e685ad-f444-4e27-a976-b4101694275f">

## 7. Polymorphism
The term polymorphism signifies having multiple forms. It emerges within a hierarchical inheritance structure. In C++, polymorphism entails that invoking a member function will lead to distinct function executions based on the invoking object's type.

Polymorphism is categorized into two types:
1. Compile-time Polymorphism - function overloading and operator overloading.
2. Runtime Polymorphism - function overriding and virtual functions.

```
class Mobile {
public: 
    void open_camera(){
        cout<<"Camera Opened"<<endl;
    }

    void open_camera(int mp){ // function overloading - compile time
        cout<<mp<<"MP Camera Opened"<<endl;
    }
};

class Samsung_Mobile : public Mobile {
public : 
    void open_camera(){ // function overriding - run time
        cout<<"128MP Camera Opened"<<endl;
    }
};
```

## 8. Destructor
A destructor, similar to a constructor, is a special member function responsible for the cleanup of class objects initiated by constructors. It bears the class name preceded by a tilde (~) symbol, and its role is to release resources or perform necessary cleanup when objects are no longer in scope or are explicitly deleted.

<b> Characteristics of the destructor: </b>
  - Memory Deallocation: For dynamically allocated objects, destructors must be called using delete to release memory. In contrast, statically allocated objects handle memory deallocation automatically upon going out of scope.
  - Automatic Invocation: The compiler triggers a destructor when its corresponding constructor's scope ends, releasing unnecessary memory space.
  - No Arguments or Return: Destructors lack arguments and return values, preventing overloading.
  - Static and Const Constraints: Destructors can't be marked as static or const.
  - Public Declaration: Destructors should be declared in the public section of the program.

## 9. Deep copy and Shallow copy
Deep copy and Shallow copy : A shallow copy shares attribute references, while a deep copy creates a new, independent copy of the entire object structure, including nested objects. 

```
Mobile(const Mobile &other) {
    battery_ptr = other.battery_ptr; // Shallow copy (same memory address)
}

Mobile(const Mobile &other) {
    battery_ptr = other.battery_ptr; // Deep copy (copying the value)
}
```

## 10. Static Keyword 
The static keyword is used to declare class-level variables and methods that are shared among all instances of the class. The scope resolution operator (::) is used to explicitly specify the scope in which a particular class, variable, or function is defined or accessed. 

```
class Mobile {
public:
    static int totalMobiles; // Class-level variable

    Mobile() {
        totalMobiles++; // Increment the class-level variable
    }
};

int Mobile::totalMobiles = 0; // Initialize the class-level variable
```

## 11. Virtual Keyword
You can override a function in a derived class without explicitly using the virtual keyword. However, using the virtual keyword serves an important purpose and is recommended for maintaining code clarity and ensuring the intended behavior of polymorphism.

```
class Mobile {
public: 
    virtual void open_camera(){
        cout<<"Camera Opened"<<endl;
    }
};

class Samsung_Mobile : public Mobile {
public : 
    void open_camera(){ // function overridding - run time
        cout<<"128MP Camera Opened"<<endl;
    }
};
```

## 12. Abstract Class
An abstract class in C++ is a class that cannot be instantiated on its own and is meant to serve as a base for other classes. It contains at least one pure virtual function, making it impossible to create objects directly from it. The purpose of an abstract class is to provide a common interface or blueprint that derived classes must implement.

<b>Key points about abstract classes:</b>
  1. Pure Virtual Function: An abstract class contains at least one pure virtual function, which is declared using the virtual keyword followed by = 0 as an initializer. This function has no implementation in the abstract class and must be overridden in derived classes.
  2. Cannot be Instantiated: You cannot create objects of an abstract class directly. It serves as a template for other classes to inherit from.
  3. Derived Class Implementation: Derived classes that inherit from an abstract class must provide implementations for all the pure virtual functions of the base class. This ensures that instances of derived classes can be created and used.
```
class Mobile {
public: 
    virtual void open_camera() = 0; // Pure virtual function
};

class Samsung_Mobile : public Mobile {
public : 
    void open_camera() {
        cout << "128MP Camera Opened" << endl;
    }
};
```

## 13. Friend Class
A class declared as a friend can reach private and protected components of another class. This is beneficial when you need to grant specific access to certain class members, permitting one class to interact with the private elements of another.

<b>Important points about friend functions and classes: </b>
  1. Friendship is not mutual. If class A is a friend of B, then B doesn’t become a friend of A automatically.
  2. Friendship is not inherited.
  3. The concept of friends is not there in Java.

```
class Mobile {
private:
    int privateValue = 42; // Private member

    friend class CameraFriend; // Declaring CameraFriend as a friend class
};

class CameraFriend {
public:
    void accessMobilePrivateValue(Mobile& mobile) {
        cout << "Accessing private value: " << mobile.privateValue << endl;
    }
};
```

## 14. Base Class Pointer Derived Class Object
The concept "Base Class Pointer Derived Class Object" means that you can use a pointer of the base class type to point to an object of a derived class. This is possible because a derived class object includes all the members and functionalities of its base class, in addition to its own unique members and functionalities. But if you try "Derived Class Pointer Base Class Object" if would give an error.

```
class Mobile {
public: 
    virtual void open_camera() = 0; // Pure virtual function
};

class Samsung_Mobile : public Mobile {
public : 
    void open_camera() {
        cout << "128MP Camera Opened" << endl;
    }
};

int main(){
    Samsung_Mobile *my_samsung_mobile1 = new Samsung_Mobile();

    Mobile* basePtr1 = my_samsung_mobile1; // Base class pointer to derived class object

    basePtr1->open_camera(); // Calls the overridden open_camera() in Samsung_Mobile

    delete my_samsung_mobile1;

    return 0;
}
```

## Next Blog 
The upcoming blog will feature interview questions sourced from various interview experiences, organized in ascending order of complexity.
