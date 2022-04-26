window.onload = async () => {
  const messagesCount = document.getElementById("messagescount"),
    nomessage = document.getElementById("nomessage"),
    realMessages = document.getElementsByClassName("real-messages")[0],
    usernameEl = document.getElementById("username"),
    emailEl = document.getElementById("email"),
    userRoleEl = document.getElementById("user-role");
  if (!localStorage.getItem("iyPortfolioInfo")) {
    // document.location.href = "/ui/login.html";
    document.location.href = "/MY-BRAND/ui/login.html";
  } else {
    const { _id, token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
    const res1 = await fetch(
      `https://my-brandbackend.herokuapp.com/api/user/${_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res1.status !== 200) document.location.href = "/ui/login.html";
    else {
      const res = await fetch(
          `https://my-brandbackend.herokuapp.com/api/query`,
          {
            headers: {
              Authorization: token,
            },
          }
        ),
        result1 = await res1.json(),
        result = await res.json(),
        { names, email, role } = result1;
      usernameEl.innerHTML = names;
      emailEl.innerHTML = email;
      messagesCount.innerHTML = result.length;
      userRoleEl.innerHTML = role;
      if (result.length === 0) nomessage.style.display = "flex";
      else {
        nomessage.style.display = "none";
        for (let i = 0; i < result.length; i++) {
          const dt = new Date(result[i].dateReceived);
          const wkDays = [
              "Sundary",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            months = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
          let day = wkDays[dt.getDay()],
            month = months[dt.getMonth()],
            year = dt.getFullYear(),
            hour = dt.getHours(),
            minutes = dt.getMinutes();
          let time,
            date = dt.getDate();
          if (date < 10) date = `0${date}`;
          if (hour < 12) time = `0${hour}:${minutes} AM`;
          else time = `${hour}:${minutes} PM`;
          const newEl = document.createElement("div"),
            p1 = document.createElement("p"),
            sp1 = document.createElement("span"),
            txt1_1 = document.createTextNode("Sender Names: "),
            txt1_2 = document.createTextNode(`${result[i].names}`),
            p2 = document.createElement("p"),
            sp2 = document.createElement("span"),
            txt2_1 = document.createTextNode("Sender Email: "),
            txt2_2 = document.createTextNode(`${result[i].email}`),
            p3 = document.createElement("p"),
            sp3 = document.createElement("span"),
            txt3_1 = document.createTextNode("Message: "),
            txt3_2 = document.createTextNode(`${result[i].messageText}`),
            p4 = document.createElement("p"),
            sp4 = document.createElement("span"),
            txt4_1 = document.createTextNode("Date received: "),
            txt4_2 = document.createTextNode(
              `${day} | ${month} ${date},${year} | ${time}`
            );
          newEl.setAttribute("class", "contact-message");
          sp1.append(txt1_1);
          p1.appendChild(sp1);
          p1.append(txt1_2);
          newEl.appendChild(p1);
          sp2.append(txt2_1);
          p2.appendChild(sp2);
          p2.append(txt2_2);
          newEl.appendChild(p2);
          sp3.append(txt3_1);
          p3.appendChild(sp3);
          p3.append(txt3_2);
          newEl.appendChild(p3);
          sp4.append(txt4_1);
          p4.appendChild(sp4);
          p4.append(txt4_2);
          newEl.appendChild(p4);
          realMessages.appendChild(newEl);
        }
      }
    }
  }
};
