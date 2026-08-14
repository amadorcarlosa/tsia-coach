namespace TsiaCoach.Domain.Value;

public sealed record Code
{
    public string Value { get; }
    public Assessment Assessment { get; }
    public ItemKind Kind { get; } 
  

    public int ItemNumber { get; }    
    
    private Code(Assessment assessment, ItemKind kind, int itemNumber)
    {
        Assessment = assessment;
        Kind = kind;
        ItemNumber = itemNumber;
        Value = $"{assessment.Value}-{kind.Value}-{itemNumber:D3}";
        
    }
    public static Code Create(Assessment assessment, ItemKind kind, int itemNumber)
    {
        if (itemNumber < 1)
        {
            throw new ArgumentOutOfRangeException(nameof(itemNumber), "Number must be greater than zero.");
        }
        if (itemNumber > 999)
        {
            throw new ArgumentOutOfRangeException(nameof(itemNumber), "Number must be less than 1000.");
        }

        return new Code(assessment, kind, itemNumber);
    }

    public static Code Parse(string code)
    {
        if (string.IsNullOrWhiteSpace(code))
        {
            throw new ArgumentException("Code cannot be null or whitespace.", nameof(code));
        }

        var segments = code.Split('-');
        if (segments.Length != 3)
        {
            throw new FormatException($"Invalid code format: '{code}'. Expected format is 'ASSESSMENT-KIND-NUMBER'.");
        }

        var assessment = Assessment.Parse(segments[0]);
        var kind = ItemKind.Parse(segments[1]);
        if (!int.TryParse(segments[2], out var itemNumber))
        {
            throw new FormatException($"Invalid item number: '{segments[2]}'. Must be an integer.");
        }
        return Create(assessment, kind, itemNumber);
    }
}
