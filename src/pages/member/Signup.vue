<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '../../stores/useMemberStore';

const router = useRouter();

const show = ref(false);
show.value = false;
const toggleShow = () => {
    show.value = !show.value;
}

const user = ref({});

const memberStore = useMemberStore();
const signup = async () => {
    console.log(user, user.value.password, user.value.passwordre)
    if(user.value.password !== user.value.passwordre) {
        alert("비밀번호가 다릅니다.");
        return;
    }
    try {
        const response = await memberStore.signup(user.value);
        
        if(response.data.idx){
            router.push('/signup_success');  
        } 
    } catch(error) {
        console.log(error);
        if(error.response.data.code == 404) {
            alert(error.response.data.data);
        }
    }
    
}
</script>

<template>
    <div class="bg-gray-300 w-full min-h-screen flex items-center justify-center">
    <!-- <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300"> -->
        <div class="w-full py-8">
        <!-- <div class="w-full">     -->
            <div class="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
            <!-- <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"> -->
                <h2 class="text-center text-2xl font-bold tracking-wide text-gray-800">회원가입</h2>
                <p class="text-center text-sm text-gray-600 mt-2">이미 계정이 있으신가요? <router-link to="/" class="text-blue-600 hover:text-blue-700 hover:underline" title="Sign In">로그인</router-link></p>

                <form action="/" @submit.prevent="signup" class="my-8 text-sm">


                    <div class="flex flex-col my-4">
                        <label for="id" class="text-gray-700">ID</label>
                        <input type="text" name="id" id="id" v-model="user.userid" class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="ID 입력">
                    </div>


                    
                    <div class="flex flex-col my-4">
                        <label for="password" class="text-gray-700">비밀번호</label>
                        <div x-data="{ show: false }" class="relative flex items-center mt-2">
                            <input :type=" show ? 'text': 'password' " v-model="user.password" name="password" id="password" class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="비밀번호 입력" type="password">
                            <button @click="toggleShow" type="button" class="absolute right-2 bg-transparent flex items-center justify-center text-gray-700">
                                <svg v-if="!show" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>

                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            </button>
                        </div>
                    </div>

                    <div class="flex flex-col my-4">
                        <label for="password_confirmation" class="text-gray-700">비밀번호 확인</label>
                        <div x-data="{ show: false }" class="relative flex items-center mt-2">
                            <input :type=" show ? 'text': 'password' " v-model="user.passwordre" name="password_confirmation" id="password_confirmation" class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="비밀번호 재입력" type="password">
                            <button @click="show = !show" type="button" class="absolute right-2 bg-transparent flex items-center justify-center text-gray-700">
                                <svg v-if="!show" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>

                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            </button>
                        </div>
                    </div>
                
                    <div class="my-4 flex items-center justify-end space-x-4">
                        <button class="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>