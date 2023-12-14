<template>
  <div class="container">
    <div class="actions" v-if="currentScreen !== 'detail'">
      <button @click="fetchUsers">Fetch</button>
      <div class="input-container">
        <input class="name" v-model="nameFilter" placeholder="Filter by Name" />
        <input class="country" v-model="countryFilter" placeholder="Filter by Country" />
      </div>
    </div>
    <div v-if="currentScreen === 'list'" class="user-list">
      <UserCard v-for="(user, index) in filteredUsers" :key="index" :user="user" @show-profile="showUserProfile" />
    </div>
    <div v-if="currentScreen === 'detail'">
      <PersonDetail :person="selectedUser" @back="backToList" @update-name="updateUserName" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import axios from 'axios';

import UserCard from './components/UserCard.vue';
import PersonDetail from './components/PersonalDetail.vue';

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
  components: {
    UserCard,
    PersonDetail,
  },
  setup() {
    const users = ref<User[]>([]);
    const nameFilter = ref<string>('');
    const countryFilter = ref<string>('');
    const selectedUser = ref<User | null>(null);
    const currentScreen = ref<string>('list');

    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://randomuser.me/api/?results=10');
        users.value = res.data.results;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const filteredUsers = computed(() => {
      let filtered = [...users.value];

      if (nameFilter.value) {
        filtered = filtered.filter(user =>
          user.name.first.toLowerCase().includes(nameFilter.value.toLowerCase()) ||
          user.name.last.toLowerCase().includes(nameFilter.value.toLowerCase())
        );
      }

      if (countryFilter.value) {
        filtered = filtered.filter(user =>
          user.location.country.toLowerCase().includes(countryFilter.value.toLowerCase())
        );
      }

      return filtered;
    });

    const showUserProfile = (user: User) => {
      selectedUser.value = user;
      currentScreen.value = 'detail';
    };

    const backToList = () => {
      currentScreen.value = 'list';
    };

    const updateUserName = ({ firstName, lastName }: { firstName: string; lastName: string }) => {
      if (selectedUser.value) {
        selectedUser.value.name.first = firstName;
        selectedUser.value.name.last = lastName;
      }
      currentScreen.value = 'list';
    };

    return {
      users,
      nameFilter,
      countryFilter,
      selectedUser,
      filteredUsers,
      currentScreen,
      fetchUsers,
      showUserProfile,
      backToList,
      updateUserName,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

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
  margin: 0 auto 1rem;
  padding: 0.25rem 1rem;
  border-radius: 4px;
  opacity: 0.8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

button:hover {
  opacity: 1;
}
</style>
