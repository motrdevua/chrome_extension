function getWeekDay(date) {
  let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[date.getDay()];
}

function setDay() {
  const days = document.querySelectorAll('#days div');
  let date = new Date();
  let weekDay = getWeekDay(date);

  for (const day of days) {
    if (day.textContent === weekDay) {
      day.style = 'font-size: 23px; font-weight: bold; -webkit-box-reflect: below -25px linear-gradient(transparent, #0003);';
    }
  }
}

setDay();

function clock() {
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');

  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  hours.innerHTML = h;
  minutes.innerHTML = m;
  seconds.innerHTML = s;
}

setInterval(clock, 1000);

// Coingecko
async function getNewCoinPrice() {
  const url = 'https://api.coingecko.com/api/v3/';
  const coins = ['bitcoin', 'litecoin', 'ethereum'];
  const coinsPrice = document.querySelectorAll('.prices .prices__item span');

  for (const [index, coin] of coins.entries()) {
    fetch(`${url}coins/${coin}/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (coinsPrice[index].parentNode.dataset.coin === coin) {
          coinsPrice[index].innerHTML = data.market_data.current_price.usd;
        }
      });
  }
}
getNewCoinPrice().then(setInterval(getNewCoinPrice, 60000));

//NBUStatService
function dateFormat() {
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('');
}

function getNewCurrencyPrice() {
  let date = `date=${dateFormat()}&`;
  const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?${date}json`;
  const currencyPrice = document.querySelectorAll('.prices .prices__item span');

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((currency) => {
        for (let j = 0; j < currencyPrice.length; j++) {
          if (currencyPrice[j].parentNode.dataset.currency === currency.cc) {
            currencyPrice[j].innerHTML = currency.rate.toFixed(3);
          }
        }
      });
    });
}

getNewCurrencyPrice();

window.onload = function () {
  setTimeout(() => {
    document.querySelector('.loader-inner').style.transform = 'translate(-50%, -50%) scale(0)';
    document.querySelector('.loader-wrapper').style.backgroundColor = 'rgba(0, 0, 0, 0);';
    document.querySelector('.loader-wrapper').style.opacity = '0';
    document.querySelector('.loader-wrapper').style.zIndex = '-1';
    document.querySelector('.loader-wrapper').style.transition = 'all .4s linear';

    document.querySelector('.clock').style.opacity = '1';
    document.querySelector('.clock').style.transform = 'translateY(0) scale(1)';
    document.querySelector('.clock').style.transition = 'all .4s linear';

    document.querySelector('.quick-links').style.opacity = '1';
    document.querySelector('.quick-links').style.transform = 'translateY(0) scale(1)';
    document.querySelector('.quick-links').style.transition = 'all .4s linear';

    document.querySelector('.prices').style.opacity = '1';
    document.querySelector('.prices').style.transform = 'translateY(0) scale(1)';
    document.querySelector('.prices').style.transition = 'all .4s linear .3s';
  }, 750);
};
