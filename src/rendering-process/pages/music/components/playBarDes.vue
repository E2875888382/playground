<template>
    <div class="play-current">
        <div class="avatar-box" @mouseenter="avatarHover = true" @mouseleave="avatarHover = false" @click="togglePlayPanel">
            <el-avatar shape="square" :size="60" :src="music.al.picUrl ? music.al.picUrl + '?param=60y60' : staticPic"></el-avatar>
            <div class="avatar__mask" v-show="avatarHover">
                <i class="iconfont icon-jiantoujinggao" :class="[fullScreen ? 'icon_right_top_reverse' : 'icon_right_top']"></i>
                <i class="iconfont icon-jiantoujinggao" :class="[fullScreen ? 'icon_left_bottom_reverse' : 'icon_left_bottom']"></i>
            </div>
        </div>
        <div class="play-current__des">
            <p class="des__title">
                <span class="title__content">{{music.name}}</span>
                <span v-if="music.id" class="iconfont icon-1_music89"></span>
            </p>
            <p class="des__author">{{getAuthors(music.ar)}}</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
    props: {
        music: {
            type: Object,
            default: ()=> {
                return {
                    name: '',
                    ar: [],
                    al: {}
                }
            }
        }
    },
    setup() {
        const store = useStore();
        const fullScreen = ref(false);
        const getAuthors = arr=> arr.map(item=> item.name).join('/');
        const avatarHover = ref(false);

        return {
            avatarHover,
            getAuthors,
            staticPic: require('commonImgs/defaultMusic.jpg'),
            togglePlayPanel: ()=> {
                if (store.state.music.playlist.length === 0) return;
                fullScreen.value = !fullScreen.value;
                store.commit('music/updateFullSreen', fullScreen.value);
            },
            fullScreen
        }
    }
}
</script>

<style lang="less" scoped>
@playSideBarHeight: 90px;
.play-current {
    flex-grow: 1;
    .flex-center;
    justify-content: flex-start;
    height: @playSideBarHeight;
    padding-left: 15px;
    &__des {
        height: 60px;
    }
    .des__title,
    .des__author {
        .flex-center;
        justify-content: flex-start;
        margin: 0 0 0 15px;
        line-height: 30px;
        font-size: 18px;
    }
    .title__content,
    .des__author {
        max-width: 190px;
        .font-overflow;
        -webkit-line-clamp: 1;
    }
    .des__author {
        font-weight: lighter;
        font-size: 16px;
    }
    .iconfont {
        padding-left: 8px;
        font-size: 25px;
        cursor: pointer;
    }
}
.avatar-box {
    position: relative;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 4px;
    &:hover {
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #333;
            opacity: 0.5;
        }
        .el-avatar {
            filter: blur(2px);
        }
    }
}
.avatar__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
}
.iconfont {
    color: #fff;
}
.icon_right_top {
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(130deg);
}
.icon_right_top_reverse {
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(-47deg);
}
.icon_left_bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: rotate(-49deg);
}
.icon_left_bottom_reverse {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: rotate(-224deg);
}
</style>