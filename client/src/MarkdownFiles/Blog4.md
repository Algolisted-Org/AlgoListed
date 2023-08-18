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

In this blog, I will elaborate on fundamental Object-Oriented Programming (OOP) concepts and provide illustrative code snippets to facilitate comprehension. Additionally, I have included a set of OOP-related questions aimed at assisting you in preparing for interviews.

<b> What will you learn : </b>
  - Class and Object
  - Constructor
  - 4 Pillars of OOPS
  - Encapsulation
  - Abstraction
  - Inheritance
  - PolyMorphism
  - Destructor
  - Static Keyword
  - Friend Function
  - Base Class Pointer Derived Class Object
  - OOPS Interview Questions
  

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
