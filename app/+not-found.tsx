import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AlertCircle } from "lucide-react-native";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Page Not Found" }} />
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <AlertCircle size={64} color="#0066CC" />
                </View>
                <Text style={styles.title}>Page Not Found</Text>
                <Text style={styles.description}>
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </Text>
                <Link href={"/(tabs)/dashboard" as any} asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Go to Dashboard</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E3F2FD",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "700" as const,
        color: "#000",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 32,
        lineHeight: 24,
    },
    button: {
        backgroundColor: "#0066CC",
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600" as const,
        color: "#FFF",
    },
});
