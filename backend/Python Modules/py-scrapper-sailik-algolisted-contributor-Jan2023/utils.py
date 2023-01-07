"""
    Contains utility function to update upto which the problems has been downloaded, writing chapter info to a file, resetting configuration,
    reading upto which the problems has been downloaded
"""
import pickle

def update_tracker(file_name, problem_num):
     """

     """
     with open(file_name, "w") as f:
         f.write(str(problem_num))

def dump_chapters_to_file(chapters):
    """

    """
    with open('chapters.pickle', 'wb') as f:
        pickle.dump(chapters, f)

def reset_configuration():
    """
        Resets problem num downloaded upto to -1
        Resets  all the chapters
        Resets html file
    """
    update_tracker("track.conf", -1)
    dump_chapters_to_file([])

    with open("out.html", "wb") as f:
        f.write(b" ")


def read_tracker(file_name):
    """
    
    """
    with open(file_name, "r") as f:
        return int(f.readline())




