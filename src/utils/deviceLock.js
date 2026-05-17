// Generates a random cryptographic hash string if one doesn't exist
const generateUniqueId = () => {
  const array = new Uint32Array(4);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => dec.toString(16).padStart(8, '0')).join('');
};

export const getOrCreateDeviceId = () => {
  let deviceId = localStorage.getItem('madonna_device_signature');
  
  if (!deviceId) {
    deviceId = generateUniqueId();
    localStorage.setItem('madonna_device_signature', deviceId);
  }
  
  // 💡 Crucial for setup: This lets you read the ID of any tablet/phone in the browser console!
  console.log("------------------------------------------");
  console.log(`CURRENT DEVICE SIGNATURE ID: ${deviceId}`);
  console.log("------------------------------------------");
  
  return deviceId;
};
