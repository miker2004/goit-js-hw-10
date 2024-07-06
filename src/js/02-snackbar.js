import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const userDelayInput = document.querySelector("body > form > label > input[type=number]");
const notificationBTN = document.getElementById("main-batton");
const goodCheckbox = document.querySelector("body > form > fieldset > label:nth-child(2) > input[type=radio]");

const isItWorking = () => {
    const delay = userDelayInput.value;
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isChecked = goodCheckbox.checked;
            
            if (!isChecked) {
                reject(`❌ Rejected promise in ${delay}ms`);
            } else {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            }
        }, delay);
    });
};

notificationBTN.addEventListener('click', (event) => {
    event.preventDefault();
    
    isItWorking()
        .then((message) => {
            iziToast.show({
                message: message,
            });
        })
        .catch((error) => {
            iziToast.show({
                message: error,
            });
        });
});