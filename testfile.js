const s = "eeww aaddddd jjj bddjk";

const arr = []; // creating empty array so that we can put each word into this array

let i = 0; // start traversing string from 0th index

let tempS = "";  //this is temperory string in which we are going to take the specific word by adding charactes one by one  AND once we find space , it means word is completed , so we will push it into array and make this temporary string empty so that we can do the same for other words.

while (i <= s.length) { // here just checking so that , our i will not go beyond the string length

    //before checking this if block please check else if block okay
    if (i === s.length || s[i] === " ") {  // here if we are getting space or we are out of the string length

        arr.push(tempS); // then put this tempS into array ... 

        tempS = ""; // making it empty as i said before... so that we can use it for next word...

    } else if (s[i] !== " ") {  // here we are checking if we are getting abcd characters 

        tempS += s[i]; // if we get normal characters so add these characters into this tempS string. AND tell me till when you will add into it ? ans-> until you get any space,,, if you get space means your word is completed ...and then go to if block

    }
    i++; // here simple move i ahead....
}

console.log(arr);






// like we have ........what can be the logic here?

//  "a a a d d d d d d"
//   i j
// i = 0 and j = 1 ...we will check if s[i] and s[j] are equal ... yes they are so just move j ahead 

// "a a a d d d d d d
//  i   j
//again equal so again move

// "a a a d d d d d d
//  i     j
//now not equal ,, so count the length 
// so now  length will be like ,,, j =3 and i = 0 so j-i = 3 so we can see  "a" count is 3

// now what we did make this i = j and moved j ahead that is j++

//  "a a a d d d d d d"
//         i j
//s[i] and s[j] are equal... so move j ahead as we did before

//  "a a a d d d d d d"
//         i   j
// again s[i] and s[j] are equal... so move j ahead as we did before

//  "a a a d d d d d d"
//         i     j
// again s[i] and s[j] are equal... so move j ahead as we did before

//  "a a a d d d d d d"
//         i       j
// again s[i] and s[j] are equal... so move j ahead as we did before

//  "a a a d d d d d d"
//         i         j
// again s[i] and s[j] are equal... so move j ahead as we did before

//  "a a a d d d d d d"
//         i           j
// again s[i] and s[j] are not equal... j is out of the index now... so again here as well count the length 
// i =3 and j = 9 ... j-i = 6 ...which means "d" count is 6 

//here we are keep on comparing our previous length which was 3 and now it is 6 ...
//which is greater keep it into maxi variable okay ... 


// this is how we want that our i will be at 1st index of our consequtive string and j will be at the end so that we can get the length of it 





let maximum = 0; //this is just to get the maximum length of your specific string like "aaaddddd" so it will carry the lenght of ddddd ==> that is 5.

let tellMeString = ""; // this will carry the string like "aaadddddd" (this is what we wanted).


for (let s of arr) { // it is just traversing array items which are words here ... 

    let i = 0; // we are using while loop so initilize i with 0 
    let j = 1; // and j will be next to i  so initilized j = 1


    let count = 0; // normal count of charaters which are consequtive
    let maxi = 0; // it will keep the maximum count of the string...

    while (j <= s.length) { // checking the if j is not going out of the index....

        if (s[i] === s[j]) { // here we are checking if they are equal ..if they are then just do j++ as i told you before...

            j++; // here just doing j++

        } else { // if they are not equal then ?

            count = j - i; // then just count the length as i told 

            if (maxi < count) { // here check if our previous count is greater than our maxi 

                maxi = count; // yes our maxi was 0 initilially and our count is 3 now bcz a are 3 ..right ? so we will make maxi as 3

                count = 0; // and make this count as 0 ...
            }

            i = j; // i told you make i = j ..
            j++; // and move j ahead...
        }
    }

    if (maxi > maximum) {  // see , maxi has only the maximum length of consequetive characters of only one word  one by one  , so here you will take the maximum of the array actually .. getting my point ? in maxi you are just taking the consequtive chars length but in maximum variable you are keeping the max value of the array , so maxi was 3 and maximum is 0 ...so now  

        maximum = maxi; // this maximum will become 3 ... after that when maxi will be 6 bcz of "d" then again we will check ... if maxi is greater then again update maximum

        tellMeString = s; // and this is the string what we want

    }
}

console.log(tellMeString, maximum);
// that's it




console.log("===================================================");

let obj = [
    {
        firstname: "John",
        lastname: "Ferguson",
        gender: "Male",
        dob: "12/1/2022",
        id: "1",
    },
    {
        firstname: "Leonardo",
        lastname: "Mitchell",
        gender: "Male",
        dob: "15/1/2022",
        id: "2",
    },
];


function howManyProperty(num , objectHere) {
    for (let o = 0; o < objectHere.length; o++) {
        let k = Object.keys(objectHere[o]);

        for (let index = num; index < k.length; index++) {

            delete objectHere[o][k[index]];
            
        }

    }
    console.log(objectHere)
}


howManyProperty(3 , obj);