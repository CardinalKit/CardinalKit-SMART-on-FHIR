import Firebase from '../firebase';

// Get all surveys for a particular user
export const getSurveys = async (userID) => {
    const firebase = new Firebase();
    try {
        const snapshot = await firebase.surveys(userID).get();
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        return (error);
    }
}