// Define the Doctor class
class Doctor {
    constructor(name, avgConsultTime) {
        this.name = name;
        this.avgConsultTime = avgConsultTime; // in minutes
        this.patients = [];
    }

    addPatient(patient) {
        this.patients.push(patient);
    }
    
    removePatient(patient) {
        this.patients = this.patients.filter(p => p !== patient);
    }

    get waitingTime() {
        return this.patients.length * this.avgConsultTime;
    }
}

function calculateWaitingTime(doctors, queuePosition) {
    // Calculate the total consultation time for the patients ahead of the patient in queue
    let selectedDoctor = 0;
    for (let i = 0; i < queuePosition; i++) {
        const sort = doctors.sort(function (a, b) {
            return a.waitingTime - b.waitingTime;
        });
        let doctor = sort[0];
        doctor.addPatient(`P${i + 1}`);
        if (i == queuePosition - 1) {
            selectedDoctor = doctor;
        }
    }
    console.log('selected dr: ', selectedDoctor);
    return (selectedDoctor.patients.length - 1) * selectedDoctor.avgConsultTime;
}


// Test the function
let doctors = [
    new Doctor("Doctor A", 3),
    new Doctor("Doctor B", 4),
    new Doctor("Doctor C", 3)
];
let queuePosition = 6;
let estimatedWaitingTime = calculateWaitingTime(doctors, queuePosition);
console.log("Estimated waiting time: " + estimatedWaitingTime + " minutes");
