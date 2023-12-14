<template>
    <div>
        <div class="image-container">
            <img :src="person.picture.large" :alt="`Large image of ${person.name.first} ${person.name.last}`" />
        </div>
        <div>
            <form @submit.prevent="updateName">
                <label>
                    Name:
                    <input v-model="editedName" />
                </label>
                <button type="submit">Update Name</button>
            </form>
            <p>Gender: {{ person.gender }}</p>
            <p>Age: {{ person.dob.age }}, Year: {{ getYearOfBirth(person.dob.date) }}</p>
            <h4>Address:</h4>
            <p>Street: {{ person.location.street.number }} {{ person.location.street.name }}</p>
            <p>City: {{ person.location.city }}</p>
            <p>State: {{ person.location.state }}</p>
            <h4>Contact:</h4>
            <p>Email: {{ person.email }}</p>
            <p>Phone: {{ person.phone }}</p>
        </div>
        <button @click="goBack">Back</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

interface Person {
    picture: {
        large: string;
    };
    name: {
        first: string;
        last: string;
    };
    gender: string;
    dob: {
        age: number;
        date: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
    };
    email: string;
    phone: string;
}

export default defineComponent({
    props: {
        person: {
            type: Object as PropType<Person>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const editedName = ref(`${props.person.name.first} ${props.person.name.last}`);

        const updateName = () => {
            const [firstName, lastName] = editedName.value.split(' ');
            emit('update-name', { firstName, lastName });
        };

        const goBack = () => {
            emit('back');
        };

        const getYearOfBirth = (dateString: string): number => {
            const date = new Date(dateString);
            return date.getFullYear();
        };

        return {
            editedName,
            updateName,
            goBack,
            getYearOfBirth,
        };
    },
});
</script>

<style scoped>
input {
    display: inline;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.25rem;
    width: 200px;
    resize: none;
    background-color: #fff;
}

button {
    display: block;
    font: inherit;
    cursor: pointer;
    border: none;
    background-color: rgb(76, 101, 169);
    color: #fff;
    margin: 0.5rem auto 1rem;
    padding: 0.25rem 1rem;
    border-radius: 4px;
    opacity: 0.8;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.image-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

h4 {
    margin-top: 0.5rem;
}
</style>
