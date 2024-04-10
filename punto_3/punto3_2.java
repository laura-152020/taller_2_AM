import java.util.*;

public class punto3_2 {

    public static List<String> posiblesCombinaciones(String x) {
        List<String> combinaciones = new ArrayList<>();
        if (x == null || x.length() == 0) {
            return combinaciones;
        }

        String[] teclado = {
                " ",
                "1",
                "abc",
                "def",
                "ghi",
                "jkl",
                "mno",
                "pqrs",
                "tuv",
                "wxyz"
        };

        funcionCombinaciones(x, "", 0, teclado, combinaciones);
        return combinaciones;
    }

    private static void funcionCombinaciones(String x, String xi, int paso, String[] teclado,
            List<String> combinaciones) {
        if (paso == x.length()) {
            combinaciones.add(xi);
            return;
        }

        String letras = teclado[x.charAt(paso) - '0'];
        for (int i = 0; i < letras.length(); i++) {
            funcionCombinaciones(x, xi + letras.charAt(i), paso + 1, teclado, combinaciones);
        }
    }

    public static void main(String[] args) {
        String entrada = "7225";
        List<String> resultado = posiblesCombinaciones(entrada);
        System.out.println("Las posibles combinaciones para " + entrada + " son: " + resultado);
    }
}
