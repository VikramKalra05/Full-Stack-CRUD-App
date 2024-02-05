export const submitUserDetails = async (payload) => {
    const data = JSON.stringify(payload);
    
    try {
        const response = await fetch("https://tan-clear-gharial.cyclic.app/users/register", {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "Application/json"
            }
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }


}