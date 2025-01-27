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

        console.log("RESPOSE ", response);
        
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


export const updateName = async (newName: string, token: string) => {
  try {
    const response = await fetch('http://localhost:4000/auth/update-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Attach JWT token for authentication
      },
      body: JSON.stringify({ newName }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error);
      return;
    }
    return data;
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

export const updatePassword = async (password: string, newPassword: string, token: string) => {
  try {
    const response = await fetch('http://localhost:4000/auth/update-pass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Attach JWT token for authentication
      },
      body: JSON.stringify({ password, newPassword }),
    });

    const data = await response.json();

    console.log("AUTH SERVICE", data.message);
    if (!response.ok) {
      console.error(data.error);
      return;
    }
    return data;

  } catch (error) {
    console.error('Error updating name:', error);
  }
};


