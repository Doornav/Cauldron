export const loginRequest = async (data: any) => {
    console.log(data);
    try {
        const response =  await fetch('http://localhost:4000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error during login:', error);
    }
};


export const signupRequest = async (data: any) => {
    console.log(data);
    try {
        const response =  await fetch('http://localhost:4000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error during singup', error);
    }
};



