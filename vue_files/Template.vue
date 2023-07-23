<template>
    <form @submit.prevent="submitForm" class="new-form">
      <label for="firstname">First Name:</label>
      <input type="text" v-model="formData.firstname" id="firstname" required>

      <label for="lastname">Last Name:</label>
      <input type="text" v-model="formData.lastname" id="lastname" required>
  
      <label for="email">Email:</label>
      <input type="email" v-model="formData.email" id="email" required>

      <label for="phone">Phone:</label>
      <input type="text" v-model="formData.phone" id="phone" required>
  
      <button type="submit">Submit</button>
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
                phone: '',
            }
        }
    },
    methods: {
        submitForm() {
            console.log(this.formData);
            alert('Submission successful!');
        }
    }
}
</script>

<style>

.new-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>