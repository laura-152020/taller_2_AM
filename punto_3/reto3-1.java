import java.util.*;

class reto4 {
    public static String cadenaLarga(String s) {
        if (s == null || s.length() == 0) {
            return "";
        }

        Map<Character, Integer> map = new HashMap<>();
        int xi = 0;
        int amplitudmax = 0;
        int max = 0;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (map.containsKey(c) && map.get(c) >= xi) {
                xi = map.get(c) + 1;
            }
            map.put(c, i);
            if (i - xi + 1 > amplitudmax) {
                amplitudmax = i - xi + 1;
                max = xi;
            }
        }

        return s.substring(max, max + amplitudmax);
    }

    public static void main(String[] args) {
        String input = "psicologia";
        System.out.println("Lo que se puso: " + input);
        System.out.println("El substring sin repetir más largo es: " + cadenaLarga(input));
    }
}