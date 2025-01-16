const config = {
    apiUrl : import.meta.env.VITE_API_URL || 'https://ptpi.tech/',
    pinCodeUrl : import.meta.env.VITE_POSTAL_API_URL || 'https://ptpi.tech/',
    };
  
   
    export const getApiUrl = () => config.apiUrl;
    export const getPincodeUrl = () => config.pinCodeUrl;
    
    export default config;