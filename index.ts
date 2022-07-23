// ---------- Subject ----------
// import { fromEvent, Subject } from "rxjs";
// import { map } from "rxjs/operators";

// const emitButton = document.querySelector('button#emit');
// const inputElement: HTMLInputElement = document.querySelector('#value-input');
// const subscribeButton = document.querySelector('button#subscribe');

// const value$ = new Subject<string>();

// fromEvent(emitButton, 'click').pipe(
//   map(() => inputElement.value)
// ).subscribe(value$);

// fromEvent(subscribeButton, 'click').subscribe(
//   () => {
//     console.log('New Subscription');
//     value$.subscribe(value => console.log(value));
//   }
// );

// ---------- BehaviorSubject ----------
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement =
  document.querySelector('button#print-state');

const isLoggedIn$ = new BehaviorSubject<boolean>(false);

fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));

// Navigation bar
isLoggedIn$.subscribe(
  (isLoggedIn) => (loggedInSpan.innerText = isLoggedIn.toString())
);

// Buttons
isLoggedIn$.subscribe((isLoggedIn) => {
  logoutButton.style.display = isLoggedIn ? 'block' : 'none';
  loginButton.style.display = !isLoggedIn ? 'block' : 'none';
});

// withLatestFrom does is whenever a click event is emitted, the 'withLatestFrom' operator will take the latest
// value from the BehaviorSubject and create an array with that value added.
fromEvent(printStateButton, 'click')
  .pipe(withLatestFrom(isLoggedIn$))
  .subscribe(([event, isLoggedIn]) =>
    console.log('User is logged in:', isLoggedIn)
  );
