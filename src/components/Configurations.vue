<template>
  <div class="main">
    <form novalidate @submit.prevent="validate">
      <md-card>

        <md-card-header v-if="title">
          <div class="md-title">{{title}}</div>
        </md-card-header>

        <md-card-content>
          <div class="content">
              <md-field :class="getValidationClass('width')">
                <label for="width">Width</label>
                <md-input type="number" id="width" name="width" autocomplete="width" v-model="form.width" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.width.required">Width is required</span>
                <span class="md-error" v-else-if="!$v.form.width.maxLength">Invalid width (999 is max)</span>
                <span class="md-error" v-else-if="!$v.form.width.minLength">Invalid width (10 is min)</span>
              </md-field>

              <md-field :class="getValidationClass('height')">
                <label for="height">Height</label>
                <md-input type="number" id="height" name="height" autocomplete="height" v-model="form.height" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.height.required">Height is required</span>
                <span class="md-error" v-else-if="!$v.form.height.maxLength">Invalid height (999 is max)</span>
                <span class="md-error" v-else-if="!$v.form.height.minLength">Invalid height (10 is min)</span>
              </md-field>

              <md-button type="submit" class="md-primary" :disabled="sending">Update</md-button>
          </div>

          <slot></slot>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

      </md-card>

      <md-snackbar :md-active.sync="saved">New configurations are set!</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import {
    required,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators';

  export default {
    name: 'Configurations',
    mixins: [validationMixin],
    props: ['title', 'width', 'height'],
    data: () => ({
      form: {
        width: null,
        height: null
      },
      saved: false,
      sending: false
    }),
    validations: {
      form: {
        width: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(3)
        },
        height: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(3)
        }
      }
    },
    created() {
      this.form.width = this.width;
      this.form.height = this.height;
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName];

        if (field) {
          return {
            'text-field': true,
            'md-invalid': field.$invalid && field.$dirty
          };
        }
      },
      clearForm () {
        this.$v.$reset();
        this.form.width = null;
        this.form.height = null;
      },
      save() {
        this.sending = true;

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.saved = true;
          this.sending = false;

          const { width, height } = this.form;
          this.$emit('configurations-change', { width, height })
        }, 1000)
      },
      validate () {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.save();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    width: fit-content;
    margin-bottom: 10px;
  }

  .content {
    display: flex;
  }

  .text-field {
    width: 200px;
    margin-right: 10px;
  }

  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .md-primary {
    margin-top: 20px;
  }
</style>