<template>

  <md-whiteframe  align="center" md-elevation="10">
  <md-card style="padding: 4rem;">
    <md-card-content>
        <div class="md-title" style="flex: 1;">
          Status: {{transaction.status | capitalize}}
          <md-icon style="font-size: 2rem;" v-if="isNew">fiber_new</md-icon>
          <div class="md-subhead">
              Transaction: {{transaction['.key']}}
          </div>
        </div>
    </md-card-content>

    <md-card-content>
      <div class="md-subheading">
        Store: {{transaction.store}}
        <div class="md-subhead">
          Store Name: {{transaction.store_name}}
        </div>
      </div>
    </md-card-content>
    <md-card-content>
      <div class="md-title">
        {{transaction.employee || 'Unassigned'}}
      </div>
      <div class="md-subhead">
        Employee
      </div>
    </md-card-content>
    <md-card-header>
      <div class="md-subheading">
        Total Products: {{transaction.product_count}}
      </div>
    </md-card-header>
    <md-card-header>
      <md-card-header-text>
        <div>
        Total: {{transaction.total}}
        </div>
        <div>
          Change: {{transaction.change}}
        </div>
        <div>
          Amount: {{transaction.amount}}
        </div>
      </md-card-header-text>
      <md-card-header-text >
        <div>
        Sub Total: {{transaction.subtotal}}
        </div>
        <div>
        Tax: <span style="color: blue">(+{{transaction.tax}})</span>

        </div>
        <div>
        Discount: <span style="color: red">(-{{transaction.discount}})</span>
        </div>
      </md-card-header-text>
    </md-card-header>

    <md-card-content align="center">

      <div class="md-title">
        {{(transaction.customer || 'Anonymous') | capitalize}}
      </div>
      <div class="md-subhead">
        Customer
      </div>
    </md-card-content>


    <md-card-media-actions>
      <div class="md-subheading">
        Created: <span class="md-subheader"> {{new Date(transaction.created_date).toDateString()}} </span>
      </div>
      <div class="md-subheading">
        Updated: <span class="md-subheader"> {{transaction.updated_date | moment("from")}} </span>
      </div>
    </md-card-media-actions>
    <md-card-actions>
      <slot name="buttons"></slot>
    </md-card-actions>
  </md-card>
  </md-whiteframe>
</template>

<script>
  export default {
    name: 'transaction',
    props: ['transaction'],
    computed: {
        isNew() {
          let today = new Date();
          let created = new Date(this.transaction.created_date);
          return today.toDateString() === created.toDateString();
        },
    }
  }
</script>
