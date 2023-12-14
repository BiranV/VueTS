<template>
    <div class="user-card" @click="showUserProfile">
        <img :src="user.picture.thumbnail" :alt="`Thumbnail of ${user.name.first} ${user.name.last}`" />
        <div>
            <p>Name: {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</p>
            <p>Gender: {{ user.gender }}</p>
            <p>Country: {{ user.location.country }}</p>
            <p>Phone: {{ user.phone }}</p>
            <p>Email: {{ user.email }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface User {
    name: {
        title: string;
        first: string;
        last: string;
    };
    gender: string;
    location: {
        country: string;
    };
    phone: string;
    email: string;
    picture: {
        thumbnail: string;
    };
}

export default defineComponent({
    props: {
        user: {
            type: Object as PropType<User>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const showUserProfile = () => {
            emit('show-profile', props.user);
        };

        return {
            showUserProfile,
        };
    },
});
</script>

<style scoped>
.user-card {
    align-items: center;
    padding: 10px;
    border: 1px solid #6d6d6d;
    margin: 0.5rem 0;
    width: 400px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
    display: flex;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.user-card img {
    margin: 0.75rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
