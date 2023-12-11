const users = [{
    email: 'jane.doe@gmail.com',
    password: '1234',
    confirmPassword: '1234',
    optout: 'Profile Delay',
    firstName: 'Jane',
    lastName: '',
    birthday: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    doctor: '',
    doctorPhone: '',
    insuranceProvider: '',
    insuranceId: '',
    insuranceGroup: '',
    emergency: '',
    emergencyRelation: '',
    emergencyNumber: '',
    clinics: [],
    appointments: []
  }];

export function canLogin(email, password) {
    const user = users.find((user) => user.email === email);
    if (user) {
        const matched = user.password === password;

        return matched; 
    }

    return false;
}

export function register(user) {
    user.clinics = [];
    user.appointments = [];
    users.push(user);
    console.log("Registered", user);
}

export function findUser(email) {
    const user = users.find((user) => user.email === email);

    return user;
    
    
}