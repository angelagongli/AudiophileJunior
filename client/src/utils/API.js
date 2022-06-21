import axios from "axios";

export default {
    getUserByAuthUID: function(AuthUID) {
        return axios.get("/api/users/" + AuthUID);
    },
    makeUser: function(user) {
        return axios.post("/api/users", user);
    },
    getSubuserByID: function(Id) {
        return axios.get("/api/subusers/" + Id);
    },
    getSubusersAllByParentID: function(ParentID) {
        // Adult learning music too is their own "parent"
        return axios.get("/api/subusers/parent/" + ParentID);
    },
    makeSubuser: function(subuser) {
        return axios.post("/api/subusers", subuser);
    },
    updateSubuser: function(Id, update) {
        return axios.put("/api/subusers/" + Id, update);
    }
};
