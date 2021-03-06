<template>
  <div>

    <md-dialog ref="searchDialog">
      <md-toolbar>
        <div class="md-toolbar-container">
          <div class="md-title">
            <md-icon>search</md-icon>
            Search
          </div>
        </div>
      </md-toolbar>
      <md-dialog-content>
        <md-input-container>
          <label>
            <md-icon>search</md-icon>
            Search
          </label>
          <md-input ref="searchInput" v-model="searchValue"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="searchDataList">Search</md-button>
        <md-button class="md-raised md-warn" @click="$refs.searchDialog.close()">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>

    <slot name="extra">

    </slot>

    <transition mode="out-in"
                enter-active-class="animated bounceInLeft"
                leave-active-class="animated bounceOutLeft">

      <md-button v-if="search" class="md-fab md-mini md-fab-bottom-right"
                 style="position: fixed; z-index: 10; margin-right: 7.5rem;" @click="search = searchValue = ''">
        <md-icon>undo</md-icon>
        <md-tooltip md-direction="left">Undo the search</md-tooltip>
      </md-button>

    </transition>

    <transition mode="out-in"
                enter-active-class="animated bounceInLeft"
                leave-active-class="animated bounceOutLeft">
      <md-button v-if="!search && searchKey" class="md-fab md-mini md-fab-bottom-right" @click="$refs.searchDialog.open()"
                 style="position: fixed; z-index: 10; margin-right: 4rem;">
        <md-icon>search</md-icon>
        <md-tooltip md-direction="left">Search</md-tooltip>
      </md-button>
    </transition>
    <template v-if="dataList">

    <transition mode="out-in"
                enter-active-class="animated bounceInRight"
                leave-active-class="animated bounceOutRight">
      <template v-if="dataList.length">


        <transition-group style="margin: 0.1rem;" class="md-layout md-gutter"
                          mode="out-in"
                          name="layout-list"
                          enter-active-class="animated bounceInRight"
                          leave-active-class="animated bounceOutRight">

          <md-layout style="margin-top: 0.5rem; margin-bottom: 0.5rem;"
                     v-for="(data,index) in dataList"
                     md-flex-xsmall="100"
                     md-flex-small="50"
                     md-flex-large="33" :key="index">

            <slot :data="data"></slot>

          </md-layout>
        </transition-group>


      </template>

      <display v-else key="display" noloader="true" message="No Results">
      </display>


    </transition>
    </template>
  </div>


</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'layout',
    props: ['list', 'searchKey'],
    data() {
      return {
        search: '',
        searchValue: '',
        searched: false,
      }
    },
    computed: {
      dataList() {
        let list = this.list;
        let key = this.searchKey;
        let regExp;
        if (list && this.search && key) {
          regExp = new RegExp(`${this.search}`, 'i');
          list = _.filter(list, listItem => {
            return regExp.test(_.get(listItem, key));
          });
          if (this.searched) {
            this.addAlert({message: list.length ? `${list.length} search results matching "${this.search}"` : `No search results matching "${this.search}"`});
            this.searched = false;
          }
        }

        return list;
      }
    },
    methods: {
      searchDataList() {
        let regExp = /^[A-Za-z0-9 -]*$/i;
        if (this.searchValue == '') {
          this.addAlert({message: `Search input must not be empty`});
          this.$refs.searchDialog.close();
        } else if(!regExp.test(this.searchValue)) {
          this.addAlert({message: `Search input must not contain symbols`});
          this.$refs.searchDialog.close();
          this.searchValue = '';
          this.$refs.searchInput.$el.value = '';
        } else {
          this.$refs.searchDialog.close();
          this.addAlert({
            message: `Searching... ${this.searchValue}`, callback: () => {
              this.search = this.searchValue;
              this.searchValue = '';
              this.searched = true;
            }
          });
        }
      },
      ...mapActions([
        'addAlert'
      ])
    }
  }
</script>

<style>
  .layout-list-move {
    transition: all 1s;
  }
</style>
