<template>
    <form @submit.prevent="submitForm" class="new-form">
      <label for="firstname">First Name:</label>
      <input type="text" v-model="formData.firstname" id="firstname" required>

      <label for="lastname">Last Name:</label>
      <input type="text" v-model="formData.lastname" id="lastname" required>
  
      <label for="email">Email:</label>
      <input type="email" v-model="formData.email" id="email" required>

      <label for="contact">Contact Number:</label>
      <input type="text" v-model="formData.contact" id="contact" required>
  
      <button type="submit" :disabled="buttonDisabled">Submit</button>
    </form>
</template>

<script>
export default {
    name: 'BasicForm',
    data() {
        return {
            formData: {
                firstname: '',
                lastname: '',
                email: '',
                contact: '',
            },
            buttonDisabled: false
        }
    },
    created() {
        // Added created hook for on load of component
        console.log("BasicForm component loaded");
    },
    methods: {
        submitForm() {
            // Only submits when validateDate returns true
            let valid = this.validateData();
            if(valid) {
                console.log(this.formData);
                alert('Submission successful!');
                this.buttonDisabled = true;
            }
        },
        validateData() {
            // Regex testing for testing text strings
            let validated = false;
            const textOnlyPattern = /^[A-Za-z]+$/;
            const numberOnlyPattern = /^\d+$/;

            if(!textOnlyPattern.test(this.formData.firstname))
                alert("First Name should be characters only");
            else if(!textOnlyPattern.test(this.formData.lastname))
                alert("Last Name should be characters only");
            else if(!numberOnlyPattern.test(this.formData.contact))
                alert("Contact Number should be numbers only");
            else 
                validated = true;
            return validated;
        }
    }
}
</script>

<style>.new-form {display: flex;flex-direction: column;align-items: center;}</style>