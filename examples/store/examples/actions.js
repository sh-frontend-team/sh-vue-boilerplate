import { exampleService } from "@demo/services/api";

export default {
    async fetchExamplesData() {
        return await exampleService();
    }
};
