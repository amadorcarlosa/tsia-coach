namespace TsiaCoach.Domain.Value;

public record Source
{
    public string RawValue => $"{Assessment.Value}-{Subject.Value}-{Kind.Value}-{Year}";

    public string DisplayValue => $"{Assessment.Value} {Subject.Value} {Kind.Value} Questions, {Year}";
    public Assessment Assessment { get; }

    public ItemKind Kind { get; }
    public Subject Subject { get; }

    public int Year { get; }



    private Source(Assessment assessment, ItemKind kind, Subject subject, int year)
    {
        Assessment = assessment;
        Kind = kind;
        Subject = subject;
        Year = year;
    }

    public static Source Create(Assessment assessment, ItemKind kind, Subject subject, int year)
    {
        if (year < 2000 || year > DateTime.UtcNow.Year)
        {
            throw new ArgumentOutOfRangeException(nameof(year), $"Year must be between 2000 and {DateTime.UtcNow.Year}.");
        }

        return new Source(assessment, kind, subject, year);
    }

    public static Source Parse(string source)
    {
        if (string.IsNullOrWhiteSpace(source))
        {
            throw new ArgumentException("Source cannot be null or whitespace.", nameof(source));
        }

        var segments = source.Split('-');
        if (segments.Length != 4)
        {
            throw new FormatException($"Invalid source format: '{source}'. Expected format is 'ASSESSMENT-SUBJECT-KIND-YEAR'.");
        }

        var assessment = Assessment.Parse(segments[0]);
        var subject = Subject.Parse(segments[1]);
        var kind = ItemKind.Parse(segments[2]);
        if (!int.TryParse(segments[3], out var year))
        {
            throw new FormatException($"Invalid year: '{segments[3]}'. Must be an integer.");
        }

        return Create(assessment, kind, subject, year);

    }
}