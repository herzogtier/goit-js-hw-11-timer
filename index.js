class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.timerId = document.querySelector(selector);
  }
  start() {
    

    this.timerId.insertAdjacentHTML('beforeEnd', `<div class="field">
            <span class="value" data-value="days">11</span>
            <span class="label">Days</span>
            </div>
            <div class="field">
            <span class="value" data-value="hours">11</span>
            <span class="label">Hours</span>
            </div>
            <div class="field">
            <span class="value" data-value="mins">11</span>
            <span class="label">Minutes</span>
            </div>
            <div class="field">
            <span class="value" data-value="secs">11</span>
            <span class="label">Seconds</span>
            </div>`);
    const refs = {
      days: document.querySelector('span[data-value="days"]'),
      hours: document.querySelector('span[data-value="hours"]'),
      mins: document.querySelector('span[data-value="mins"]'),
      secs: document.querySelector('span[data-value="secs"]'),
    };
    this.intervalId = setInterval(() => {
      const currentTime = Date.now(); 
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);
      console.log(time);
      this.updateClockface(refs, time);
    }, 1000);
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  updateClockface(refs, { days, hours, mins, secs }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
  }
}
const timer = new CountdownTimer({
  selector: '#timer-1', 
  targetDate: new Date('Dec 15, 2020'),
});

timer.start();
