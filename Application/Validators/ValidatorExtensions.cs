using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty().MinimumLength(6)
                .WithMessage("la contraseña debe tener por lo menos 6 carácteres")
                .Matches("[A-Z]")
                .WithMessage("La contraseña debe tener al menos una letra mayuscula")
                .Matches("[a-z]")
                .WithMessage("La contraseña debe tener al menos una letra minuscula")
                .Matches("[1-9]")
                .WithMessage("La contraseña debe tener al menos un número")
                .Matches("[^a-zA-Z0-9]")
                .WithMessage("La contraseña debe tener al menos un simbolo");

            return options;
        }
    }

}
