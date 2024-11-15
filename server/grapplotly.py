import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Datos
x = ["A", "B", "C"]
y = [3, 5, 1]

# Gráfico de barras
fig, ax = plt.subplots()

# Crear barras con esquinas redondeadas
for i, (xi, yi) in enumerate(zip(x, y)):
    rect = patches.FancyBboxPatch(
        (i - 0.3, 0),  # posición x, y
        0.6,            # ancho
        yi,             # altura
        boxstyle="round,pad=0.1,rounding_size=0.3",  # Esquinas redondeadas
        linewidth=1,
        edgecolor="black",
        facecolor="skyblue"
    )
    ax.add_patch(rect)

# Configuración de los ejes
ax.set_xlim(-0.5, len(x) - 0.5)
ax.set_ylim(0, max(y) + 1)
ax.set_xticks(range(len(x)))
ax.set_xticklabels(x)

# Mostrar gráfico
plt.show()
