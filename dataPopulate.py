import array
import itertools
import random
import requests



names1 = """ Ajij Seikh
 Pushpak Kumar
Aditi Sah
Adhish Basak
Abhilasha Verma
Abhishek Kumar Shrivastav
Aishwarya Sejgaya
Agni Behera
Aaditya Gupta
Ankush haribhau harne
Aditya Yadav
Akash Gupta
Aashrun Gautam
ABHINAV MANGAL
ABHISHEK PRASAD
Aditya singh Tomar
AKASH TIWARI
Akshay Makwana
Anilkumar Mahto
Amit Mazumder
Aman Pandey
Alok Gautam
Amit Shukla
Anish Tiwari
Ajit Kerle
Anand Sharma
ANILKUMAR PALTETI
ANKIT PATHAK
Akash Moon
Aman Mishra
Animesh Jangir
Anjali Kothari
Ankesh Sharma
anshul nagpure
Biplove biplove
Biplab Roy
Ankita Kumari
Chetanya Rohilla
chetan gaikwad
Arjun Singh
Anuj Singh
Chinmaya Sahoo
Anugya Bansal
Bidyut Kundu
Aqueeb Hussain
Ankita Sudani
Arjun Sharma
arpit kogta
ARUN VEER
Ashutosh Gupta
Bharath Kumar
Subham Sidhartha Mahapatra
Ashwin khemraj Nikose
Ashanka Dagadu Dongare
Balivada Partha Saradhi
Arman Ahmed
Bhawana Hemane
Ashish Kumar Ranjan
Bharath Kumar
Syed faizan Ali
Bhushan Mahale
Beldar Yogesh
Bhavye Saran
AVINASH SINGH
Shubhra Ghosh
Atif Pervez
Avijit Hazra
bhuvnesh sharma
Bidipta Bikash Gogoi
Avijit Das
B.Aravind
Suraj Nikam
Supriya Hatele
Shubham Dahifale
Biswajit Ghosh
Debojit Mahapatra
Sonu kumar Yadav
Sunil Tiwari
Sumit Kumar Mishra
DEBOBRATA DEY
Deepesh kumar
Soumya prakash Ojha
Hardik
Harsh Jain
Harsh Pratap Singh
sourabh kumar
Gaurav Khajindar
Subham Kumar
Debayati Sarkar
Dhruval Moradiya
Subhajit Bokshi
Yashwanthkumar S
Harsh Kaushik
Dhiraj Patil
GUDDATI LOK SANTOSH KUMAR
Yash Kumar
Suman Dhang
keerti Reddy
Himanshu Supare
Jagadish M Jagadish M
Kajal Gajjar
Nandita Pandey
Kamaran Ahmed
Indrashish Roy
JIYA Lal
Himanshu Singh
Anik Halder
Kaluram
Jai Sharma
Hermraj Deshmukh
IBRAHIM KHAN
SUJEET PANDIT
Kajol Shrivastava
Revanth V
Ritesh Kakade
Ritikesh Nimje
Unmesh Dhore
Rinki Pradhan
Ritika Pathania
Karan Kumar """

def getName():
       return [i.strip() for i in names1.split("\n")]


def email():
    letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
               "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ]

    ad = itertools.combinations(letters, 7)  
    ad = [''.join(combo) for combo in ad]  
    return random.sample(ad, 1)[0] + '@gmail.com'


def generate_random_passwd():
    global temp_pass_list
    MAX_LEN = 12

    
    DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    LOCASE_CHARACTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                         'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q',
                         'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
                         'z']

    UPCASE_CHARACTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                         'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q',
                         'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
                         'Z']

    SYMBOLS = ['@', '#', '$', '%',
               '*']


    COMBINED_LIST = DIGITS + UPCASE_CHARACTERS + LOCASE_CHARACTERS + SYMBOLS

    
    rd = random.choice(DIGITS)
    ru = random.choice(UPCASE_CHARACTERS)
    rl = random.choice(LOCASE_CHARACTERS)
    rl = random.choice(SYMBOLS)

   
    temp_pass = rd + ru + rl + rl

    
    for x in range(MAX_LEN - 4):
        ts = ts + random.choice(COMBINED_LIST)

        
        ts_list = array.array('u', ts)
        random.shuffle(ts_list)

   
    passwd = ""
    for x in ts_list:
        passwd = passwd + x

    
    return passwd




def mobile():
    import random as r

    ph_no = ''

    # the first number should be in the range of 6 to 9
    ph_no += str((r.randint(6, 9)))

    # the for loop is used to append the other 9 numbers.
    # the other 9 numbers can be in the range of 0 to 9.

    for i in range(1, 10):
        ph_no += str((r.randint(0, 9)))

    # printing the number
    return ph_no




if __name__ == '__main__':
    for i in getName():

        dics = {}
        dics["name"] = i.strip()
        dics["phone"] = mobile()
        dics["emial"] = email()
        dics["passwd"] = generate_random_passwd()
        print(dics)
        requests.post('http://localhost:3000/register',data=dics)

        for i in range(5):
            dic1 = {}
            dic1["phone"] = mobile()
            dic1["contactOf"] = dics["phone"]
            dic1["name"]=names1.split("\n")[random.randint(0,115)]
            print(dic1)
            requests.post('http://localhost:3000/register', data=dic1)
