namespace TsiaCoach.Domain.Value;

public abstract record Assessment
{
    private Assessment() { }

    public string Value => GetType().Name.ToUpperInvariant();


    public sealed record Tsia2 : Assessment;
    public sealed record Accuplacer : Assessment;

    public static Assessment Parse(string segment) =>
        segment.Trim() switch
        {
            var s when s.Equals(nameof(Tsia2), StringComparison.OrdinalIgnoreCase) => new Tsia2(),
            var s when s.Equals(nameof(Accuplacer), StringComparison.OrdinalIgnoreCase) => new Accuplacer(),
            _ => throw new FormatException($"Unknown assessment '{segment}'.")
        };


}

public abstract record ItemKind
{
    private ItemKind() { }

    public string Value => GetType().Name.ToUpperInvariant();

    public static ItemKind Parse(string segment) =>
        segment.Trim() switch
        {
            var s when s.Equals(nameof(Sample), StringComparison.OrdinalIgnoreCase) => new Sample(),
            var s when s.Equals(nameof(Practice), StringComparison.OrdinalIgnoreCase) => new Practice(),
            var s when s.Equals(nameof(Exam), StringComparison.OrdinalIgnoreCase) => new Exam(),
            _ => throw new FormatException($"Unknown kind '{segment}'.")
        };

    public sealed record Sample : ItemKind;
    public sealed record Practice : ItemKind;
    public sealed record Exam : ItemKind;
}

public abstract record Subject
{
    private Subject() { }

    public string Value => GetType().Name.ToUpperInvariant();

    public static Subject Parse(string segment) =>
        segment.Trim() switch
        {
            var s when s.Equals(nameof(Math), StringComparison.OrdinalIgnoreCase) => new Math(),
            var s when s.Equals(nameof(Reading), StringComparison.OrdinalIgnoreCase) => new Reading(),
            var s when s.Equals(nameof(Writing), StringComparison.OrdinalIgnoreCase) => new Writing(),
            _ => throw new FormatException($"Unknown subject '{segment}'.")
        };

    public sealed record Math : Subject;
    public sealed record Reading : Subject;
    public sealed record Writing : Subject;
}