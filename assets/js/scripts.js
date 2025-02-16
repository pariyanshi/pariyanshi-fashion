; (function () {

    "use strict";

    const launchDate = new Date("Mar 1, 2025 00:00:00").getTime();

    function countdown() {
        setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").textContent = days;
            document.getElementById("hours").textContent = hours;
            document.getElementById("minutes").textContent = minutes;
            document.getElementById("seconds").textContent = seconds;
        }, 1000);
    }


    $(document).ready(function () {
        countdown();

        $("#subscribe-form").submit(function (e) {
            e.preventDefault();

            var email = $("#subscribeEmail").val();
            var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                $(".subscription-success").text("Please enter a valid email address!").css("color", "red");
                return;
            }

            var formData = {
                email: email
            };

            fetch("https://script.google.com/macros/s/AKfycbyx98QTIMx-mEmNh3mYd4-cK96V-inDN8XIR-NtVCniJ3aBYFJDBEPPVIm2uUXTZpdI5w/exec", {
                redirect: "follow",
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                    // "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                    $(".subscription-success").text("Subscribed successfully!").css("color", "green");
                    $("#subscribeEmail").val("");
                })
                .catch(error => {
                    console.error("Error:", error);
                    $(".subscription-success").text("Error! Please try again.").css("color", "red");
                });
        });

    });


})(jQuery);

