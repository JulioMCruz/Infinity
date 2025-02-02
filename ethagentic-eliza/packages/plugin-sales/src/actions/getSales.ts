import { composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
    type Action,
    type ActionExample,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type State,
} from "@elizaos/core";

import { createSalesService } from "../services";
import { getSalesTemplate } from "../templates";
import { validateEthAgenticConfig } from "../environment";
import { getSalesExamples } from "../examples";

export const getSalesAction: Action = {
    name: "GET_SALES",
    description: "Retrieve sales data from EthAgentic platform",
    similes: [
        "fetch sales information",
        "get sales data",
        "retrieve sales metrics",
    ],
    examples: getSalesExamples,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        elizaLogger.debug("🔵 Iniciando GET_SALES handler");

        // Initialize/update state
        let currentState: State = state;
        elizaLogger.debug("🔵 Estado inicial:");

        if (!currentState) {
            currentState = (await runtime.composeState(message)) as State;
            elizaLogger.debug("🔵 Estado compuesto:");
        }
        currentState = await runtime.updateRecentMessageState(currentState);
        elizaLogger.debug("🔵 Estado actualizado:");

        // TODO: CRIS - Fix this
        // // state -> context
        // const salesContext = composeContext({
        //     state: currentState,
        //     template: getSalesTemplate,
        // });
        // elizaLogger.debug("🔵 Contexto generado:");

        // // context -> content
        // const content = await generateMessageResponse({
        //     runtime,
        //     context: salesContext,
        //     modelClass: ModelClass.SMALL,
        // });
        // elizaLogger.debug("🔵 Contenido generado: content", content);

        // // Validate request type
        // if (content?.requestType !== "sales") {
        //     elizaLogger.debug("🔴 Tipo de solicitud inválido:", content?.requestType);
        //     return;
        // }
        elizaLogger.debug(
            "🔵 Tipo de solicitud válido, procediendo con la obtención de datos"
        );

        try {
            // Instantiate API service
            elizaLogger.debug("🔵 Validando configuración");
            const config = await validateEthAgenticConfig(runtime);
            elizaLogger.debug("🔵 Configuración validada:", config);

            elizaLogger.debug("🔵 Creando servicio de ventas");
            const salesService = createSalesService(config.baseUrl);

            // Fetch sales data
            elizaLogger.debug("🔵 Obteniendo datos de ventas");
            const salesData = await salesService.getSales();
            elizaLogger.debug("🔵 Respuesta del servicio:", salesData);

            if (!salesData.success) {
                elizaLogger.error(
                    "🔴 Error al obtener datos de ventas:",
                    salesData.error
                );
                callback({
                    text: `Error fetching sales data: ${salesData.error}`,
                    content: { error: salesData.error },
                });
                return false;
            }

            elizaLogger.success("🟢 Datos de ventas obtenidos exitosamente");
            elizaLogger.debug("🔵 Datos:", salesData.data);

            if (callback) {
                elizaLogger.debug("🔵 Ejecutando callback con los datos");
                callback({
                    text: `Here are the latest sales figures:\n${JSON.stringify(
                        salesData.data,
                        null,
                        2
                    )}`,
                    content: salesData.data,
                });
                return true;
            }
        } catch (error) {
            elizaLogger.error("🔴 Error en GET_SALES handler:", error);
            elizaLogger.debug("🔴 Stack trace:", error.stack);
            callback({
                text: `Error fetching sales data: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }

        elizaLogger.debug("🔵 Finalizando handler sin callback");
        return;
    },
    validate: async (runtime: IAgentRuntime) => {
        elizaLogger.debug("🔵 Validando configuración en validate()");
        try {
            await validateEthAgenticConfig(runtime);
            elizaLogger.success("🟢 Validación exitosa");
            return true;
        } catch (error) {
            elizaLogger.error("🔴 Error en validación:", error);
            return false;
        }
    },
};
