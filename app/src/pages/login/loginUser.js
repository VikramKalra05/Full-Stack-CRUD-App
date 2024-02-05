export const loginUser = async (payload) => {
    const data = JSON.stringify(payload);
    
    try {
        const response = await fetch("https://tan-clear-gharial.cyclic.app/users/login", {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "Application/json"
            }
        });

        const result = await response.json();
        localStorage.setItem("token", result.token)
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }


}