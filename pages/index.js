// Next/React Imports
import { useEffect } from "react";
import Head from "next/head";

// Library Imports
import emailjs from "emailjs-com"; //* Using socials email and Service and Template titled Workout Program
import { BiCopy } from "react-icons/bi";

// Data/Function/Image Imports
const FAVICON =
  "http://basicallyeasy.com/NextJSCDNS/workoutapp/icons/tab-icons/favicon.ico";
const ATI =
  "http://basicallyeasy.com/NextJSCDNS/workoutapp/icons/tab-icons/apple-touch-icon.png";
const F32 =
  "http://basicallyeasy.com/NextJSCDNS/workoutapp/icons/tab-icons/favicon-32x32.png";
const F16 =
  "http://basicallyeasy.com/NextJSCDNS/workoutapp/icons/tab-icons/favicon-16x16.png";

// Component Imports

// Styles
import styles from "../assets/styles/modules/Index/Index.module.css";

export default function Index() {
  // Emails the routine data
  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_56hnogp",
        "template_1jpvh19",
        e.target,
        "user_JSTANHzimtkFyipyAZDNh"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  useEffect(() => {
    const TYPE_OF_ROUTINE = document.getElementById("typeOfRoutine");
    const DATE = document.getElementById("date");
    const DESCRIBE_YOUR_ROUTINE = document.getElementById(
      "describeYourRoutine"
    );
    const EMAIL_INPUT = document.getElementById("emailInput");

    const CURRENT_DATA = document.getElementById("currentData");
    const HIDDEN_DATA = document.getElementById("hiddenData");
    const SAVE_BTN = document.getElementById("save");
    const CLEAR_BTN = document.getElementById("clear");
    const EMAIL_BTN = document.getElementById("emailSend");

    // This will append the inputs to the currentData
    function appendToCurrentData() {
      // CURRENT_DATA.innerText = "";
      // HIDDEN_DATA.innerText = "";

      let APPENDED_DATA;

      if (TYPE_OF_ROUTINE.value) {
        if (DATE.value) {
          if (DESCRIBE_YOUR_ROUTINE.value) {
            APPENDED_DATA =
              "\n" +
              "Type of routine: \n" +
              TYPE_OF_ROUTINE.value +
              "\n\n" +
              "Date: \n" +
              DATE.value +
              "\n\n" +
              "Routine Description: \n" +
              DESCRIBE_YOUR_ROUTINE.value +
              "\n\n";

              CURRENT_DATA.innerText = "";
              HIDDEN_DATA.value = "";

              CURRENT_DATA.innerText = APPENDED_DATA;
              HIDDEN_DATA.value = APPENDED_DATA;
          }
        }
      } 

      // Error Handling
      if (!TYPE_OF_ROUTINE.value) {
        console.log("Invalid Type of routine value.");        
      }

      if (!DATE.value) {
        console.log("Invalid Date value.");
      }

      if (!DESCRIBE_YOUR_ROUTINE.value) {
        console.log("Invalid Describe your routine value.");
      }

      if (!validateEmail(EMAIL_INPUT.value)) {
        console.log("Invalid Email value.");
      }

    }

    // This will be used to check if the user has inputted a valid email
    function validateEmail(email) {
      const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    }

    // This will check if the inputs are valid and will manipulate the btns
    function checkingInputs() {

      // If there are no values, prevent saving
      if (
        !TYPE_OF_ROUTINE.value ||
        !DESCRIBE_YOUR_ROUTINE.value ||
        !DATE.value ||
        !validateEmail
      ) {
        SAVE_BTN.style.opacity = 0.5;
        SAVE_BTN.style.pointerEvents = "none";
      }


      // If all values are valid, allow saving
      if (
        TYPE_OF_ROUTINE.value &&
        DESCRIBE_YOUR_ROUTINE.value &&
        DATE.value &&
        validateEmail(EMAIL_INPUT.value)
      ) {
        SAVE_BTN.style.opacity = 1;
        SAVE_BTN.style.pointerEvents = "auto";
      }
    }

    // The name explains itself..
    function clearDataAndInputs() {
      TYPE_OF_ROUTINE.value = "";
      DATE.value = "";
      DESCRIBE_YOUR_ROUTINE.value = "";
      EMAIL_INPUT.value = "";

      CURRENT_DATA.innerText = "";
      HIDDEN_DATA.value = "";

      CLEAR_BTN.style.opacity = 0.5;
      CLEAR_BTN.style.pointerEvents = "none";

      EMAIL_BTN.style.opacity = 0.5;
      EMAIL_BTN.style.pointerEvents = "none";

      localStorage.removeItem("Previous Data");
      localStorage.removeItem("Type of routine");
      localStorage.removeItem("Date");
      localStorage.removeItem("Describe your routine");

      checkingInputs();
    }

    // Displays the previous data into currentData and hiddenData
    if (localStorage.getItem("Previous Data")) {
      CURRENT_DATA.innerText = localStorage.getItem("Previous Data");
      HIDDEN_DATA.value = localStorage.getItem("Previous Data");

      // Enable clear and email btns
      CLEAR_BTN.style.opacity = 1;
      CLEAR_BTN.style.pointerEvents = "auto";

      EMAIL_BTN.style.opacity = 1;
      EMAIL_BTN.style.pointerEvents = "auto";
    }

    // Detects valid inputs
    window.addEventListener("keyup", () => {
      checkingInputs();
    });

    // Copying and Appeding current data
    document.getElementById("copyCurrentData").addEventListener("click", () => {
      if (localStorage.getItem("Type of routine")) {
        TYPE_OF_ROUTINE.value = localStorage.getItem("Type of routine");
      }

      if (localStorage.getItem("Date")) {
        DATE.value = localStorage.getItem("Date");
      }

      if (localStorage.getItem("Describe your routine")) {
        DESCRIBE_YOUR_ROUTINE.value = localStorage.getItem(
          "Describe your routine"
        );
      }

      if (localStorage.getItem("Email address")) {
        EMAIL_INPUT.value = localStorage.getItem("Email address");
      }
    });

    // Detects if user selected or entered a valid date
    DATE.addEventListener("change", () => {
      checkingInputs();
    });

    // Appends data to both the currentData, localStorage and console
    SAVE_BTN.addEventListener("click", (e) => {
      appendToCurrentData();

      console.log("true");

      // Saving the values to localStorage to display when the user comes back
      if (TYPE_OF_ROUTINE.value) {
        localStorage.setItem("Type of routine", TYPE_OF_ROUTINE.value);
      }

      if (DATE.value) {
        localStorage.setItem("Date", DATE.value);
      }

      if (DESCRIBE_YOUR_ROUTINE.value) {
        localStorage.setItem(
          "Describe your routine",
          DESCRIBE_YOUR_ROUTINE.value
        );
      }

      if (validateEmail(EMAIL_INPUT.value)) {
        localStorage.setItem("Email address", EMAIL_INPUT.value);
      }

      // Prevents submitting the same thing again
      SAVE_BTN.style.opacity = 0.5;
      SAVE_BTN.style.pointerEvents = "none";

      CLEAR_BTN.style.opacity = 1;
      CLEAR_BTN.style.pointerEvents = "auto";

      EMAIL_BTN.style.opacity = 1;
      EMAIL_BTN.style.pointerEvents = "auto";

      // Declaring the localStorage variable for saving previous data
      if (CURRENT_DATA.innerHTML != "") {
        localStorage.setItem("Previous Data", CURRENT_DATA.innerText);
      }

      e.preventDefault();
    });

    // Clears all data
    CLEAR_BTN.addEventListener("click", (e) => {
      clearDataAndInputs();
    });
  }, []);

  return (
    <div id="PAGE" className="overrides_INDEX page">
      <Head>
        <title>Workout Program</title>
        <link rel="shortcut icon" href={FAVICON} />
        <link rel="apple-touch-icon" sizes="180x180" href={ATI} />
        <link rel="icon" type="image/png" sizes="32x32" href={F32} />
        <link rel="icon" type="image/png" sizes="16x16" href={F16} />
      </Head>

      <div className={`${styles.index_heading}`}>
        <div>
          <h1>Workout Program w/ Email Results</h1>
          <p>
            This program will allow you to type out a work out routine you are
            currently do and will email you the results and each time you come
            back it will save the data for the next time you wanna use the
            program.
          </p>
        </div>
      </div>

      <form onSubmit={sendEmail}>
        <div className={`${styles.index_input_sets_holder}`}>
          <div className={`${styles.index_input_sets_holder_cnt}`}>
            <div className={styles.index_input_set}>
              <label>Type of routine:</label>
              <input
                type="text"
                name="typeOfRoutine"
                id="typeOfRoutine"
                placeholder="Ex: Losing weight for better health."
                className="input"
                autoComplete="off"
              ></input>
            </div>

            <div className={styles.index_input_set}>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                id="date"
                className="input"
              ></input>
            </div>

            <div className={styles.index_input_set}>
              <label>Describe your routine:</label>
              <textarea
                name="describeYourRoutine"
                id="describeYourRoutine"
                placeholder="Explain your routine plan."
                className="input"
                autoComplete="off"
              ></textarea>
            </div>
          </div>
        </div>

        <div className={styles.email_holder}>
          <div>
            <label>Your Email Address:</label>
            <input
              type="text"
              name="emailInput"
              id="emailInput"
              placeholder="johndoe@burner.com"
              autoComplete="off"
            />
          </div>
        </div>

        <div className={styles.hidden_data_holder}>
          <textarea id="hiddenData" name="hiddenData"></textarea>
        </div>

        <div className={styles.current_data_holder}>
          <div className={styles.current_data_holder_cnt}>
            <label>Current Routine Data:</label>
            <div id="currentData" className={styles.current_data}></div>

            <BiCopy className={styles.bi_icon} id="copyCurrentData" />
          </div>
        </div>

        <div className={styles.btns_holder}>
          <div className={styles.btns}>
            <button
              className={`${styles.btn} ${styles.save_btn} page-transition`}
              id="save"
              name="save"
            >
              SAVE DATA
            </button>
            <button
              className={`${styles.btn} ${styles.clear_btn} page-transition`}
              id="clear"
              name="clear"
            >
              CLEAR DATA
            </button>
            <button
              className={`${styles.btn} ${styles.email_btn} page-transition`}
              id="emailSend"
              name="emailSend"
              type={"submit"}
            >
              EMAIL DATA
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
