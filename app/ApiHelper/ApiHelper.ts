export const getAPI = async (userName: string) => {
  const promise1 = new Promise(async (resolve, reject) => {
    try {
      const getAge = await fetch(`https://api.agify.io?name=${userName}`);
      const age = await getAge.json();
      resolve(age?.age);
    } catch (error) {
      reject(error);
    }
  });
  const promise2 = new Promise(async (resolve, reject) => {
    try {
      const getGender = await fetch(
        `https://api.genderize.io?name=${userName}`
      );
      const gender = await getGender.json();
      resolve(gender?.gender);
    } catch (error) {
      reject(error);
    }
  });
  const promise3 = new Promise(async (resolve, reject) => {
    try {
      const getCountry = await fetch(
        `https://api.nationalize.io?name=${userName}`
      );
      const country = await getCountry.json();
      resolve(country?.country[0]?.country_id);
    } catch (error) {
      reject(error);
    }
  });

  try {
    return Promise.all([promise1, promise2, promise3]);
  } catch (error) {
    console.log(error);
  }
};
