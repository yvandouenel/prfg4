/**
 * Class Person
 */
class Person {
  constructor(lastname = "Dupond", firstname = "Pierre") {
    this.lastname = lastname;
    this.firstname = firstname;
  }
  introduceMySelf() {
    console.log(`Hello, my name is ${this.firstname} ${this.lastname}`);
  }
}

// Instanciation
const bob = new Person("Titou");

// Appel de la méthode introduceMySelf
bob.introduceMySelf();

/**
 * Class Teacher extends Person
 * On dit que la classe "Teacher" spécialise la class Person
 */
class Teacher extends Person {
  constructor(lastname, firstname, subject) {
    super(lastname, firstname);
    this.subject = subject;
    console.log(this);
  }
  /* Surcharge de la méthode introduceMyself */
  introduceMySelf() {
    super.introduceMySelf();
    console.log(`... and I'm a teacher`);
  }
  teach() {
    console.log(`My main subject: ${this.subject}`);
  }
}
const jose = new Teacher("Jamon", "José", "english");
const barbara = new Teacher("Martin", "Barbara", "History");
barbara.introduceMySelf();
jose.introduceMySelf();
jose.teach();