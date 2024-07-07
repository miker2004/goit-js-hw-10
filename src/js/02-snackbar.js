import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const userDelayInput = document.querySelector("body > form > label > input[type=number]");
const notificationBTN = document.getElementById("main-batton");
const goodCheckbox = document.querySelector("body > form > fieldset > label:nth-child(2) > input[type=radio]");

let currentTaskId = 0;

const isItWorking = (taskId) => {
    const delay = userDelayInput.value;
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (taskId !== currentTaskId) {
                return;
            }

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
    const taskId = ++currentTaskId;

    isItWorking(taskId)
        .then((message) => {
            if (taskId === currentTaskId) {
                iziToast.show({
                    message: message,
                });
            }
        })
        .catch((error) => {
            if (taskId === currentTaskId) {
                iziToast.show({
                    message: error,
                });
            }
        });
});