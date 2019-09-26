<template>
    <el-menu 
    :collapse="mycollapse"
    :collapse-transition="false"
    :default-active="sel"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @select="handleSelect"
    @close="handleClose">
        <template v-for="(r,idx) in datas">
            <el-menu-item :index="r.index" :disabled="r.disabled?true:false" v-if="!r.children" :key="'menu_'+idx">
                <i :class="r.icon" v-if="r.icon"></i>
                <span slot="title" v-text="r.label"></span>
            </el-menu-item>
            <el-submenu :index="r.index" v-if="r.children" :key="'subMenu_'+idx">
                <template slot="title">
                    <i :class="r.icon" v-if="r.icon"></i>
                    <span v-text="r.label"></span>
                </template>
                <template v-for="(r2,idx2) in r.children">
                    <el-menu-item :index="r2.index" :disabled="r2.disabled?true:false" v-if="!r2.children" :key="'menu_'+idx+'_'+idx2">
                        <i :class="r2.icon" v-if="r2.icon"></i>
                        <span slot="title" v-text="r2.label"></span>
                    </el-menu-item>
                    <el-submenu :index="r2.index" v-if="r2.children" :key="'subMenu_'+idx+'_'+idx2">
                        <template slot="title">
                            <i :class="r2.icon" v-if="r2.icon"></i>
                            <span v-text="r2.label"></span>
                        </template>
                        <template v-for="(r3,idx3) in r2.children">
                            <el-menu-item :index="r3.index" :disabled="r3.disabled?true:false" :key="'menu_'+idx+'_'+idx2+'_'+idx3">
                                <i :class="r3.icon" v-if="r3.icon"></i>
                                <span slot="title" v-text="r3.label"></span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
            </el-submenu>
        </template>
    </el-menu>
</template>

<script>
export default {
    props: ['datas', 'sel', 'mycollapse'],
    data: function () {
        return {

        }
    },
    mounted: function () {
		//this.sel=this.sel;
	},
	computed: {
		myMenuData: function () {

		}
	},
	methods: {
		handleOpen: function (key, keyPath) {
			this.$emit('myopen', key, keyPath);
		},
		handleClose: function (key, keyPath) {
			this.$emit('myclose', key, keyPath);
		},
		handleSelect: function (key, keyPath) {
			this.$emit('myselect', key, keyPath);
		}
	}
}
</script>