<!-- 
  "date" : "January 8, 2023",
  "title" : "Best C++ STL revision tool",
  "desc" : "For those who want to optimize their code and make their coding faster, we have provided a revision tool that lists all the available STL functions.",
  "category" : "DSA and CP",
  "author" : ["Atanu Nayak"],
  "authorLink" : ["https://www.linkedin.com/in/om-mittal/, https://www.linkedin.com/in/atanu-nayak-profile/"],
  "authorImageLink" : ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png, https://avatars.githubusercontent.com/u/93304796?v=4"],
  "tags" : ["STL", "Standard template library", "C++"],
  "url" : "best-cpp-stl-revision-tool",
  "titleSupport" : "It is something more than just the cheatsheet"
 -->


![image](https://user-images.githubusercontent.com/93304796/211201374-3bb9d917-105d-4f98-9ab9-ba81984b0835.png)

The purpose of this blog is to provide a summary or overview of the various C++ Standard Template Library (STL) data structures and functions that are available for use.

<b> What will you learn : </b>
  - Vector
  - Map
  - Set 
  - Binary Search
  

<b> Prerequisites : </b> It is beneficial to have a general understanding of the STL because this blog is intended to serve as a comprehensive resource for individuals who want to review all of the various ways in which the STL can be utilized.



## 4. Binary Search
The STL provides several algorithms for performing binary search on containers. The most general one is `binary_search`, which searches for a value in a range and returns a boolean indicating whether the value was found. For example:
```
int main() {
  vector<int> v = {1, 2, 3, 4, 5};
  bool found = binary_search(v.begin(), v.end(), 3);  // true
  found = binary_search(v.begin(), v.end(), 6);  // false
  return 0;
}
```

`lower_bound` returns an iterator pointing to the first element in the range that is not less than (i.e. greater than or equal to) the target value. If the target value is not found in the range, the function returns an iterator pointing to the position where the target value could be inserted without violating the order of the elements.
```
int main() {
  std::vector<int> v = {1, 2, 3, 3, 3, 4, 5};
  auto it = std::lower_bound(v.begin(), v.end(), 3);  // it points to the first 3 in the range
  it = std::lower_bound(v.begin(), v.end(), 2);  // it points to the 2
  it = std::lower_bound(v.begin(), v.end(), 6);  // it points to the position where 6 could be inserted
  return 0;
}
```

std::upper_bound is similar to std::lower_bound, but it returns an iterator pointing to the first element in the range that is greater than the target value. If the target value is not found in the range, the function returns an iterator pointing to the position where the target value could be inserted without violating the order of the elements.

Here is an example of using std::upper_bound:

```
int main() {
  std::vector<int> v = {1, 2, 3, 3, 3, 4, 5};
  auto it = std::upper_bound(v.begin(), v.end(), 3);  // it points to the first element greater than 3
  it = std::upper_bound(v.begin(), v.end(), 2);  // it points to the first element greater than 2
  it = std::upper_bound(v.begin(), v.end(), 6);  // it points to the position where 6 could be inserted
  return 0;
}
```







  


