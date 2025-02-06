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

import { createInsightsService } from "../services";
import { validateEthAgenticConfig } from "../environment";
import { getInsightsExamples } from "../examples";

export const getInsightsAction: Action = {
    name: "GET_INSIGHTS",
    description: "Retrieve insights data from EthAgentic platform",
    similes: [
        "fetch insights information",
        "get insights data",
        "retrieve insights metrics",
        "analyze platform metrics",
        "get performance insights",
    ],
    examples: getInsightsExamples,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        elizaLogger.debug("🔵 Iniciando GET_INSIGHTS handler");

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
        // const insightsContext = composeContext({
        //     state: currentState,
        //     template: getInsightsTemplate,
        // });
        // elizaLogger.debug("🔵 Contexto generado:");

        // // context -> content
        // const content = await generateMessageResponse({
        //     runtime,
        //     context: insightsContext,
        //     modelClass: ModelClass.SMALL,
        // });
        // elizaLogger.debug("🔵 Contenido generado: content", content);

        // // Validate request type
        // if (content?.requestType !== "insights") {
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

            elizaLogger.debug("🔵 Creando servicio de insights");
            const insightsService = createInsightsService(config.baseUrl);

            // Fetch insights data
            elizaLogger.debug("🔵 Obteniendo datos de insights");
            const insightsData = await insightsService.getInsights();
            elizaLogger.debug("🔵 Respuesta del servicio:", insightsData);

            if (!insightsData.success) {
                elizaLogger.error(
                    "🔴 Error al obtener datos de insights:",
                    insightsData.error
                );
                callback({
                    text: `Error fetching insights data: ${insightsData.error}`,
                    content: { error: insightsData.error },
                });
                return false;
            }

            elizaLogger.success("🟢 Datos de insights obtenidos exitosamente");
            elizaLogger.debug("🔵 Datos:", insightsData.data);

            if (callback) {
                elizaLogger.debug("🔵 Ejecutando callback con los datos");
                callback({
                    text: formatInsightsResponse(insightsData.data),
                    content: insightsData.data,
                });

                // Helper function to format insights data in a more readable way
                function formatInsightsResponse(data: any[]): string {
                    if (!data || data.length === 0) {
                        return "No insights data available.";
                    }

                    const header = "📊 Latest Insights Report 📊\n";
                    const insights = data
                        .map((item) => {
                            const trendIcon = getTrendIcon(item.trend);
                            const percentageFormatted =
                                item.percentage > 0
                                    ? `+${item.percentage}%`
                                    : `${item.percentage}%`;

                            return `${trendIcon} ${item.metric}
   Value: ${item.value.toLocaleString()}
   Change: ${percentageFormatted}\n`;
                        })
                        .join("\n");

                    return `${header}\n${insights}`;
                }

                function getTrendIcon(trend: string): string {
                    switch (trend?.toLowerCase()) {
                        case "up":
                            return "📈";
                        case "down":
                            return "📉";
                        case "stable":
                            return "➡️";
                        default:
                            return "❔";
                    }
                }
                return true;
            }
        } catch (error) {
            elizaLogger.error("🔴 Error en GET_INSIGHTS handler:", error);
            elizaLogger.debug("🔴 Stack trace:", error.stack);
            callback({
                text: `Error fetching insights data: ${error.message}`,
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
